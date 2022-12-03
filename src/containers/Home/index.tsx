import { PrimaryTitle, Wrapper, Button } from "../../components";
import { signoutUser } from "../../services/firebase/auth/signoutUser";

export function Home() {
    return (
        <Wrapper>
            <PrimaryTitle>Home</PrimaryTitle>

            <Button title="Sign out ->" onPress={signoutUser}/>
        </Wrapper>
    );
}
