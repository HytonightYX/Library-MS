import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from './component/Loadable'
import NavWrapper from 'component/NavWrapper'

export default () => (
	<Router>
		<Switch>
			<Route exact path='/login' component={Loadable({loader: () => import('./app/login')})}/>
			<Route path='/' render={() => (
				<div className='app-root'>
					<NavWrapper>
						<Switch>
							<Route exact path='/book' component={Loadable({loader: () => import('./app/book')})}/>
							
						</Switch>
					</NavWrapper>
				</div>
			)}/>
		</Switch>
	</Router>
)