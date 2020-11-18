import './App.css';
import AddField from './Components/AddField'
import CourseList from './Components/CourseList'
function App() {
  return (
    <div className="App">

      <h1 className="text-center m-5 text-light">GRADING APP<i class="fa fa-calculator ml-4"></i></h1>
      <AddField />
      <CourseList />
    </div>
  );
}

export default App;
