import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './components/hoc/layout';
import MovieDetail from './components/movie_detail/movie_detail';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/movie/:id" exact component={MovieDetail} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes
