import ROUTE_PATHS from './paths';

const Home = import('../Pages/Todo/todoPage/TodoPage');
const Signin = import('../Pages/Form/signin/SingIn');
const SignUp = import('../Pages/Form/signup/SignUp');
const SignOut = import('../Pages/Form/signout/SignOut');
const Contact = import('../Pages/Form/contact/ContactUs');
const About = import('../Pages/Form/about/About');
const Notes = import('../Pages/Todo/notes/NotesItems');
const AddNote = import('../Pages/Todo/addTodo/AddTodo');
const CompletedNotes = import('../Pages/Todo/notes/ShowNotes');
const UpdateUser = import('../Pages/Form/update/UpdateUser');

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
        Component: Notes,
        path: ROUTE_PATHS.NOTEITEMS
    },
    {
        Component: AddNote,
        path: ROUTE_PATHS.ADD_NOTE
    },
    {
        Component: CompletedNotes,
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