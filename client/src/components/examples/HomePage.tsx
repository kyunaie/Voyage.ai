import { HomePage } from "../HomePage";
import { ThemeProvider } from "../ThemeProvider";

export default function HomePageExample() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
