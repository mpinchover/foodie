import {
  Box,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  RangeSlider,
  RangeSliderFilledTrack,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { RxScissors } from "react-icons/rx";
import VideoClipPlayer from "./video-clip-player";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTheme } from "@chakra-ui/react";
import { videoClipsStore } from "../../recoil/video";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const STEP = 0.25 * 4;

const Timeline = ({ displayRange, videoRef, duration, range, setRange }) => {
  const [minValue, setMinValue] = useState(0); // Left thumb value
  const [maxValue, setMaxValue] = useState(duration); // Right thumb value
  const [isDragging, setIsDragging] = useState(null); // Tracks which thumb is being dragged
  const theme = useTheme();
  const blue500 = theme.colors.blue[600]; // Get the value of "blue.500"
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickPlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (maxValue == 0) {
      setMaxValue(duration);
    }
    // setMaxValue(duration);
    const handleMouseMove = (e) => {
      if (isDragging === null) return;

      const sliderRect = document
        .querySelector(".slider-container")
        .getBoundingClientRect();

      // Calculate the percentage of mouse position within the slider
      const percentage = Math.max(
        0,
        Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width)
      );

      // Map percentage to duration and round to the nearest step
      const value = Math.round((percentage * duration) / STEP) * STEP;
      if (value === minValue || value == maxValue) {
        return;
      }

      if (isDragging === "min" && value < maxValue) {
        setMinValue(value);
        setRange([value, maxValue]);
      } else if (isDragging === "max" && value > minValue) {
        setMaxValue(value);
        setRange([minValue, value]);
      }
      videoRef.current.currentTime = value;
    };

    const handleMouseUp = () => {
      setIsDragging(null); // Stop dragging
      videoRef.current.currentTime = minValue;
      videoRef.current.play();
      setIsPlaying(true);
    };

    const handleMouseDown = () => {
      videoRef.current.pause();
      setIsPlaying(false);
    };

    if (isDragging !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isDragging, minValue, maxValue, duration, setRange]);

  // Calculate positions of thumbs as percentages
  const leftPercentage = (minValue / duration) * 100;
  const rightPercentage = (maxValue / duration) * 100;

  const handleThumbMouseDown = (thumb) => {
    setIsDragging(thumb);
  };

  return (
    <Box
      display="flex"
      backgroundColor="rgba(255, 255, 255, 0.6)"
      position="absolute"
      flexDirection="row"
      bottom="50px"
      left="50px"
      right="50px"
      borderRadius="md"
      style={{
        opacity: displayRange ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: displayRange ? "auto" : "none",
      }}
    >
      <Box
        marginRight={6}
        marginLeft={6}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        {!isPlaying && (
          <FaPlay
            cursor={"pointer"}
            onClick={handleClickPlay}
            color={blue500}
          />
        )}
        {isPlaying && (
          <FaPause
            cursor={"pointer"}
            onClick={handleClickPlay}
            color={blue500}
          />
        )}
      </Box>
      <Box
        className="slider-container"
        position="relative"
        borderRadius="md"
        h="60px"
        width="full"
      >
        {/* Red range border */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          //   bg="red.500"
          border="4px yellow solid"
          left={`${leftPercentage}%`}
          right={`${100 - rightPercentage}%`}
          zIndex={1}
          borderRadius="md"
        />
        {/* Left Thumb */}
        <Button
          transform="translate(-50%, -50%)"
          position="absolute"
          left={`${leftPercentage}%`}
          top="50%"
          width="10px"
          padding="0"
          minWidth="0"
          zIndex={2}
          onMouseDown={() => handleThumbMouseDown("min")}
        />
        {/* Right Thumb */}
        <Button
          transform="translate(-50%, -50%)"
          position="absolute"
          left={`${rightPercentage}%`}
          top="50%"
          width="10px"
          padding="0"
          minWidth="0"
          zIndex={2}
          onMouseDown={() => handleThumbMouseDown("max")}
        />
      </Box>
    </Box>
  );
};

export default Timeline;
