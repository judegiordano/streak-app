import { AnimatedCounter } from "./components/AnimatedCounter";
import { Divider } from "./components/Divider";
import { Screen } from "./components/Screen";
import { cleanNumber } from "./helpers";
import { useStreak } from "./hooks/useStreak";

function App() {
  const { streak } = useStreak()

  if (!streak) return <Screen><></></Screen>

  return (
    <Screen>
      <AnimatedCounter className="font-press text-[75px]" value={cleanNumber(streak.streak)} duration={0.5} />
      <span className="font-audiowide pt-2">
        current streak
      </span>
      <Divider />
      <AnimatedCounter className="font-press text-[50px]" value={cleanNumber(streak.longest_streak)} duration={0.5} />
      <span className="font-audiowide pt-2">
        best all time
      </span>
    </Screen>
  );
}

export default App;
