import ROUTE_PATHS from './paths';

const Home = import('../Pages/Todo/TodoPage')
const Signin = import('../Pages/Form/SignIn/SingIn');
const SignUp = import('../Pages/Form/SignUp');
const Contact = import('../Pages/Form/ContactUs');
const About = import('../User');
const Notes = import('../Pages/Todo/NotesItems');
const UpdateUser = import('../Pages/Form/UpdateUser');

interface AppRoute {
    path: string;
    Component: any;
  }

  const routes: AppRoute[] = [
    {
        Component: Home,
        path: ROUTE_PATHS.HOME
    },{
        Component: Signin,
        path: ROUTE_PATHS.SIGNIN
    },
    {
        Component: SignUp,
        path: ROUTE_PATHS.SIGNUP
    },
    {
        Component: Notes,
        path: ROUTE_PATHS.ADDNOTE
    },
    {
        Component: Contact,
        path: ROUTE_PATHS.CONTACT
    },
    {
        Component: About,
        path: ROUTE_PATHS.ABOUT
    },
    {
        Component: UpdateUser,
        path: ROUTE_PATHS.UPDATEUSER
    },
  ]

  export default routes;