import { Box, Heading, Input, Button, Stack, VStack, HStack, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No task entered.",
        description: "Please enter a task before adding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, inputValue]);
    setInputValue("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => index !== taskIndex);
    setTasks(newTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>Todo App</Heading>
      <HStack>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add a task..." size="md" />
        <Button leftIcon={<FaPlus />} colorScheme="blue" px={6} onClick={addTask}>
          Add
        </Button>
      </HStack>
      <VStack w="100%" mt={4}>
        {tasks.map((task, index) => (
          <HStack w="100%" key={index}>
            <Box p={4} bg="gray.100" w="100%" borderRadius="md">
              <Text>{task}</Text>
            </Box>
            <IconButton icon={<FaTrash />} aria-label="Delete task" colorScheme="red" onClick={() => deleteTask(index)} />
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
