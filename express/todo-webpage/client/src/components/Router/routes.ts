import ROUTE_PATHS from './paths';

 import About from '../Pages/Form/about/About';
import Contact from '../Pages/Form/contact/ContactUs';
import Signin from '../Pages/Form/signin/SingIn';
import SignOut from '../Pages/Form/signout/SignOut';
import SignUp from '../Pages/Form/signup/SignUp';
import UpdateUser from '../Pages/Form/update/UpdateUser';
import NotesItems from '../Pages/Todo/notes/NotesItems';
import Home from '../Pages/Todo/todoPage/TodoPage';

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
        Component: SignOut,
        path: ROUTE_PATHS.SINGOUT
    },
    {
        Component: NotesItems,
        path: ROUTE_PATHS.NOTEITEMS
    },
    {
        Component: NotesItems,
        path: ROUTE_PATHS.ADD_NOTE
    },
    {
        Component: NotesItems,
        path: ROUTE_PATHS.COMPLETED_NOTE
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