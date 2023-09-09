import React from 'react';
import { CommonActions, StackActions } from '@react-navigation/native';

const useNavigator =
	Component =>
		({ ...prop }) => {
			const { navigation, route } = prop;
			const { navigate, goBack, popToTop } = navigation;
			const replace = (path, params) => {
				return navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [
							{
								name: path,
								params,
							},
						],
					}),
				);
			};

			const push = (path, params) =>
				navigation.dispatch(StackActions.push(path, params));

			const popCount = (count = 1) =>
				navigation.dispatch(StackActions.pop(count));

			const Actions = {
				push,
				pop: goBack,
				popToRoot: popToTop,
				navigate,
				replace,
				currentScene: route.name,
				popCount,
			};

			return <Component {...prop} {...prop.route.params} Actions={Actions} />;
		};

export default useNavigator;
