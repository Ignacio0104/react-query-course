import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import RQSuperHeroesPage from './components/RQSuperheroes.page';
import {ReactQueryDevtools} from "react-query/devtools"
import HomePage from './components/Home.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import { QueryClient, QueryClientProvider } from 'react-query';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependentQueriesPage from './components/DependentQueries.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfiniteQueriesPage from './components/InfiniteQueries.page';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-parallel">RQ Parallel</Link>
            </li>
            <li>
              <Link to="/rq-dynamic-parallel">RQ Parallel Dynamic</Link>
            </li>
            <li>
              <Link to="/rq-dependent">RQ Dependent</Link>
            </li>
            <li>
              <Link to="/rq-paginated">RQ Paginated</Link>
            </li>
            <li>
              <Link to="/rq-infinite">RQ Infinite</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/super-heroes' element={<SuperHeroesPage/>}> </Route>
          <Route path='/rq-infinite' element={<InfiniteQueriesPage/>}> </Route>
          <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1,3]}/>}> </Route>
          <Route path='/rq-dependent' element={<DependentQueriesPage email="vishwas@example.com"/>}> </Route>
          <Route path='/rq-paginated' element={<PaginatedQueriesPage/>}> </Route>
          <Route path='/rq-super-heroes' element={<RQSuperHeroesPage/>} ></Route>
          <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage/>} ></Route>
          <Route path='/rq-parallel' element={<ParallelQueriesPage/>} ></Route>
          <Route path="/" element={<HomePage/>} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  );
}

export default App;
