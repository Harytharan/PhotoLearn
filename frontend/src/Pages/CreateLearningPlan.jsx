import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImg from "../images/workoutBck.jpg";
import { useActiveTab } from "../context/ActiveTabContext";
import toast from "react-hot-toast";
import axios from "axios";
//modify the planning
const subjects = [
  "Portrait Photography",
  "Landscape Photography",
  "Product & Commercial Photography",
  "Event Photography",
  "Editing & Post-Processing",
  "Others",
];

const CreateLearningPlan = () => {
  const [selectedSubject, setSelectedSubject] = useState("Programming");
  const [learningPlanName, setLearningPlanName] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [schedule, setSchedule] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState({});
  const [editLearningPlans, setEditLearningPlans] = useState(false);
  const { setActiveTab } = useActiveTab();
  const { learningPlanId } = useParams();
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchSingleLearningPlan = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/learningPlans/${learningPlanId}`
        );
        setSelectedSubject(data.subjects);
        setLearningPlanName(data.learningPlanName);
        setHoursPerDay(data.hoursPerDay);
        setSchedule(data.schedule);
        setDescription(data.description);
        setDate(data.date);
        setEditLearningPlans(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (learningPlanId) {
      fetchSingleLearningPlan();
    }
  }, [learningPlanId]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!selectedSubject || !learningPlanName || !hoursPerDay || !schedule || !description || !date) {
      return toast.error("Please fill all the fields");
    }

    const selected = new Date(date);
    const todayDate = new Date();
    selected.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);

    if (selected < todayDate) {
      return toast.error("Date must be today or a future date");
    }

    const planData = {
      userId: user.id,
      learningPlanName,
      subjects: selectedSubject,
      hoursPerDay,
      schedule,
      date,
      description,
    };

    try {
      const res = editLearningPlans
        ? await axios.put(`http://localhost:8080/learningPlans/${learningPlanId}`, planData)
        : await axios.post(`http://localhost:8080/learningPlans`, planData);

      if (res.status === 200 || res.status === 201) {
        toast.success(
          editLearningPlans
            ? "Learning Plan Updated Successfully"
            : "Learning Plan Created Successfully"
        );
        setLearningPlanName("");
        setHoursPerDay("");
        setSchedule("");
        setDate("");
        setDescription("");
        setSelectedSubject("Programming");
        navigate("/");
        setActiveTab("tab3");
      }
    } catch (error) {
      toast.error("Failed to save learning plan");
    }
  };

  const goToLearningPlans = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div
        className="min-h-screen p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w mx-auto my-6 bg-white p-12 rounded-lg shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }} //sfgezg
        >
          <h1 className="mb-4 text-3xl font-semibold text-center text-indigo-600">
            {editLearningPlans ? "Edit Learning Plan" : "Create Learning Plan"}
          </h1>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Please select your Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div> 

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Learning Plan Name
            </label>
            <input
              type="text"
              value={learningPlanName}
              onChange={(e) => setLearningPlanName(e.target.value)}
              placeholder="Enter learning plan name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hours per Day
            </label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              placeholder="Enter hours per day"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Schedule
            </label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g., Daily / Weekly"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Description of your learning
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your learning goals and achievements..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-700"
          >
            {editLearningPlans ? "Update Learning Plan" : "Create Learning Plan"}
          </button>
          <button
            onClick={goToLearningPlans}
            type="button"
            className="w-full mt-2 px-4 py-2 text-sm font-medium text-black border border-red-600 hover:bg-red-600 hover:text-white rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateLearningPlan;
