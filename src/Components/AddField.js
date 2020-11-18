import React, { useState, useEffect } from 'react';
function AddField() {


    const [courseName, setCourseName] = useState("")
    const [courseGrade, setCourseGrade] = useState("")
    const [error, setError] = useState("")
    const [courses, setCourse] = useState([])
    const [editing, setEdit] = useState(0)
    const [x, setX] = useState("")
    const [y, setY] = useState(0)
    const [analytics, setAnalytics] = useState({
        min: 0,
        max: 0,
        average: 0
    })

    useEffect(() => {
        checkMinMax()
    }, [courses, courseGrade, courseName])


    function handleClick(e) {
        e.preventDefault();
        var regx = /^\d{1,3}$/

        if (courseName.length === 0) {
            setError("Course Name cannot be blank")
        }
        else if (courseGrade > 100 || courseGrade < 0 || courseGrade === "" || !courseGrade.match(regx)) {
            setError("Grade must be an integer between 0-100")
        }
        else {
            setError(null)
            var obj = {
                name: courseName,
                grade: courseGrade
            }

            if (editing === 1) {
                courses.forEach((course) => {
                    if (course.name === x) {
                        console.log("worked")
                        const items = courses
                        items.forEach((item) => {
                            if (item.name === x) {
                                item.name = courseName
                                item.grade = courseGrade
                                setCourse(items)
                                setCourseName("")
                                setCourseGrade("")
                                setX("")
                                setEdit(0)
                                return
                            }
                        })

                    }
                })
            }
            else {
                setCourse([...courses, obj])
                setCourseName("")
                setCourseGrade("")

            }
        }
    }
    function handleChange(e) {

        e.preventDefault()
        if (e.target.name === 'courseName') {
            setCourseName(e.target.value);
        }
        else if (e.target.name === 'courseGrade') {
            setCourseGrade(e.target.value);

        }
    }
    function handleEdit(e) {

        setEdit(1)
        setX((courses.filter((course) => course.name === e.target.id))[0].name)
        setY((courses.filter((course) => course.name === e.target.id))[0].grade)
        setCourseName((courses.filter((course) => course.name === e.target.id))[0].name)
        setCourseGrade((courses.filter((course) => course.name === e.target.id))[0].grade)

    }
    function handleDelete(e) {
        e.preventDefault()
        setCourse(courses.filter((course) => course.name !== e.target.id))
    }
    async function checkMinMax() {
        if (courses.length == 0) {
            return
        }
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        var avg = 0;
        for (var i = courses.length - 1; i >= 0; i--) {
            tmp = parseInt(courses[i].grade);
            avg = avg + tmp;
            console.log(avg)
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
        }
        avg = parseInt(avg / courses.length)

        setAnalytics({
            min: lowest,
            max: highest,
            average: avg
        })
    }
    return (
        <div className="container">
            <form>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" class="form-control" placeholder="Course Name" name="courseName" value={courseName} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input type="text" class="form-control" placeholder="Grade" name="courseGrade" value={courseGrade} onChange={handleChange} />
                    </div>
                    <div className="btn btn-primary" onClick={handleClick}>
                        ADD COURSE
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {error &&
                            <div class="alert alert-danger m-3" role="alert">
                                {error}
                            </div>
                        }
                    </div>
                </div>
            </form>
            <div className="container">
                <h4 className="text-center mt-5 mb-3 text-light">COURSE TABLE</h4>

                <table class="table table-danger">
                    <thead>
                        <tr>
                            <th scope="col">Course Name</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    {
                        courses.map(course => (
                            <tbody>
                                <tr>
                                    <th scope="row" >{course.name}</th>
                                    <td>{course.grade}</td>
                                    <td><span class="glyphicon glyphicon-pencil" onClick={handleEdit} id={course.name} ></span></td>
                                    <td><span class="glyphicon glyphicon-trash" onClick={handleDelete} id={course.name}></span></td>
                                </tr>
                            </tbody>
                        ))
                    }

                </table>
            </div>


            <div className="container">
                <h4 className="text-center mt-5 mb-3 text-light">ANALYTICS TABLE</h4>

                <table class="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">Minimum</th>
                            <th scope="col">Maximum</th>
                            <th scope="col">Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>{analytics.min}</td>
                            <td>{analytics.max}</td>
                            <td>{analytics.average}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
export default AddField; 
