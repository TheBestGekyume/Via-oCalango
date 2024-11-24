import LoadAnimation from "../assets/LoadConfirm.json";
import { Player } from "@lottiefiles/react-lottie-player";

export function LoadConfirm() {
	return (
		<>
			<Player
				autoplay
				loop
				style={{ width: "150px", height: "150px" }}
				src={LoadAnimation}
			/>
		</>
	);
}
