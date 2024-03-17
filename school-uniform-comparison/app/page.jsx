import Feed from "../components/Feed";
import ScatterGraph from '../components/Chart.jsx';

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      School Uniform Comparison
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Comparing school uniform prices all over the UK</span>
    </h1>
    <p className='desc text-center'>
      Branded school uniforms are expensive. We compare prices from different sources to help you save money.
    </p>

    <Feed />
    <ScatterGraph/>
  </section>
);

export default Home;
