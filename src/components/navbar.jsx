import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiChefToque } from "react-icons/gi";
import { TbChefHat } from "react-icons/tb";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <Box
      as="nav"
      padding="1rem"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex
        maxW="1000px" // Limit navbar width
        mx="auto" // Center the navbar horizontally
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left: Logo */}
        <TbChefHat fontSize={28} />

        {/* Middle: Search Bar */}
        <Box flex="1" mx="4">
          <InputGroup>
            <Input
              placeholder="Search for food or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="md"
              bg="white"
              borderColor="gray.300"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                mr="2"
                colorScheme="blue"
                onClick={handleSearch}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Right: Actions Button */}
        <Menu>
          <MenuButton borderRadius="md" as={Button}>
            M P
          </MenuButton>
          <MenuList>
            <MenuItem>Messages</MenuItem>
            <MenuItem>My posts</MenuItem>

            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;