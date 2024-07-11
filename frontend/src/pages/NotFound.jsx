import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  
	return (
		<Link to={'/'}>

			<Flex w={"full"} justifyContent={"center"}>
        <Text>Hmmmmm... There is no such page</Text>
				<Button mx={"auto"}>Back To home</Button>
			</Flex>
		</Link>
	);
};

export default NotFoundPage;