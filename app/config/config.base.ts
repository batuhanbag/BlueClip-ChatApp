import { RouteNames } from '../navigators/RouteNames';

export interface ConfigBaseProps {
  exitRoutes: RouteNames[];
}

const BaseConfig: ConfigBaseProps = {
  exitRoutes: [RouteNames.Login]
};

export default BaseConfig;
