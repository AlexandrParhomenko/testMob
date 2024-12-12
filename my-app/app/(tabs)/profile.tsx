import InstructorProfile from "../../components/InstructorProfile/InstructorProfile";
import {useSelector} from "react-redux";
import Profile from "../../components/Profile/Profile";
import {selectPickedAccount} from "../store/reducers/authSlice";

export default function TabThreeScreen() {
    const account = useSelector(selectPickedAccount)
    const role = account.role_id

    return (
        <>
            {role === 2 ? <Profile/> : <InstructorProfile/>}
        </>
    );
}
