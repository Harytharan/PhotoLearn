import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import backgroundImg from "../images/statusBck.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useActiveTab } from "../context/ActiveTabContext";

const CreateLearningStatus = () => {
  const { setActiveTab } = useActiveTab();
  const [topicLearned, setTopicLearned] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
  const [conceptsCovered, setConceptsCovered] = useState("");
  const [keyLearnings, setKeyLearnings] = useState("");
  const [challengesFaced, setChallengesFaced] = useState("");
  const [resourcesUsed, setResourcesUsed] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  const { statusId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const { data } = await axios.get(
            `http://localhost:8080/learningStatus/${statusId}`
        );
        setTopicLearned(data.topicLearned);
        setHoursSpent(data.hoursSpent);
        setConceptsCovered(data.conceptsCovered);
        setKeyLearnings(data.keyLearnings);
        setChallengesFaced(data.challengesFaced);
        setResourcesUsed(data.resourcesUsed);
        setDate(data.date);
        setEditStatus(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (statusId) {
      fetchSinglePost();
    }
  }, [statusId]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (
        !topicLearned ||
        !hoursSpent ||
        !conceptsCovered ||
        !keyLearnings ||
        !challengesFaced ||
        !resourcesUsed ||
        !date
    ) {
      return toast.error("Please fill all the fields");
    }

    const learningStatusData = {
      userId: user.id,
      topicLearned,
      hoursSpent,
      conceptsCovered,
      keyLearnings,
      challengesFaced,
      resourcesUsed,
      date,
    };

    try {
      let res;
      if (editStatus) {
        res = await axios.put(
            `http://localhost:8080/learningStatus/${statusId}`,
            learningStatusData
        );
      } else {
        res = await axios.post(
            "http://localhost:8080/learningStatus",
            learningStatusData
        );
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(
            `Learning progress ${editStatus ? "updated" : "added"} successfully`
        );
        setTopicLearned("");
        setHoursSpent("");
        setConceptsCovered("");
        setKeyLearnings("");
        setChallengesFaced("");
        setResourcesUsed("");
        setDate("");
        navigate("/");
        setActiveTab("tab2");
      }
    } catch (error) {
      toast.error("Failed to save learning progress");
    }
  };

  const goToLearningStatus = () => {
    navigate("/");
    setActiveTab("tab2");
  };

  return (
      <Layout>
        <div
            className="min-h-screen p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          <h1 className="mb-4 text-3xl font-semibold text-center text-white">
            {editStatus
                ? "Edit Learning Progress"
                : "Create Learning Progress"}
          </h1>
          <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-transparent"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}
          >
            <div className="mb-4">
              <label className="block text-sl font-medium text-gray-700">
                Topic Learned
              </label>
              <input
                  type="text"
                  value={topicLearned}
                  onChange={(e) => setTopicLearned(e.target.value)}
                  placeholder="Enter topic"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sl font-medium text-gray-700">
                Hours Spent
              </label>
              <input
                  type="number"
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(e.target.value)}
                  placeholder="Enter hours spent"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sl font-medium text-gray-700">
                Concepts Covered
              </label>
              <textarea
                  value={conceptsCovered}
                  onChange={(e) => setConceptsCovered(e.target.value)}
                  placeholder="E.g. React hooks, Spring Boot REST API..."
                  rows="2"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sl font-medium text-gray-700">
                Key Learnings
              </label>
              <textarea
                  value={keyLearnings}
                  onChange={(e) => setKeyLearnings(e.target.value)}
                  placeholder="What did you learn today?"
                  rows="2"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sl font-medium text-gray-700">
                Challenges Faced
              </label>
              <textarea
                  value={challengesFaced}
                  onChange={(e) => setChallengesFaced(e.target.value)}
                  placeholder="Mention any difficulties you faced"
                  rows="2"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sl font-medium text-gray-700">
                Resources Used
              </label>
              <textarea
                  value={resourcesUsed}
                  onChange={(e) => setResourcesUsed(e.target.value)}
                  placeholder="List tutorials, books, etc."
                  rows="2"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-success rounded-md shadow hover:bg-success-700 focus:outline-none"
            >
              {editStatus ? "Update Progress" : "Create Progress"}
            </button>
            <button
                onClick={goToLearningStatus}
                className="w-full px-4 mt-2 py-2 text-sm font-medium text-black bg-transparent rounded-md shadow hover:bg-red-700 hover:text-white focus:outline-none"
            >
              Cancel
            </button>
          </form>
        </div>
      </Layout>
  );
};

export default CreateLearningStatus;
