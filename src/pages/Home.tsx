import HeroV2 from "../components/HeroV2";
import HomeLetter from "../components/widgets/HomeLetter";
import LatestJourney from "../components/widgets/LatestJourney";
import LatestGallery from "../components/widgets/LatestGallery";
import LatestBlessing from "../components/widgets/LatestBlessing";
import PredictionStats from "../components/widgets/PredictionStats";
import CountdownWidget from "../components/widgets/CountdownWidget";

export default function Home() {
  return (
    <>
      <HeroV2 />
      <HomeLetter />
      <LatestJourney />
      <LatestGallery />
      <LatestBlessing />
      <PredictionStats />
      <CountdownWidget />
    </>
  );
}