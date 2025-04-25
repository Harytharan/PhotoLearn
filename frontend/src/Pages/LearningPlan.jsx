import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import backgroundImg from '../images/statusBck.jpg';

const LearningPlan = ({ user }) => {
  const [learningPlans, setLearningPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLearningPlans = async () => {
      try {
        const res = await axios.get("http://localhost:8080/learningPlans");
        if (res.status === 200) {
          setLearningPlans(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch learning plans");
      }
    };
    fetchLearningPlans();
  }, []);

  const deleteLearningPlan = async (plan) => {
    try {
      await axios.delete(`http://localhost:8080/learningPlans/${plan.learningPlanId}`);
      setLearningPlans((prevPlans) =>
          prevPlans.filter((p) => p.learningPlanId !== plan.learningPlanId)
      );
      toast.success("Learning plan deleted successfully");
    } catch (error) {
      toast.error("Failed to delete learning plan");
    }
  };

  const navigateEditPage = (plan) => {
    navigate(`/CreateLearningPlan/${plan.learningPlanId}`);
  };

  return (
      <div
          className="container mx-auto p-4 min-h-screen"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
      >
        <div className="space-y-4 flex justify-center flex-col items-center">
          {learningPlans.map((plan, index) => (
              <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 w-[600px] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                          src={plan?.userProfile}
                          alt="user"
                          className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{plan?.username}</h2>
                      <p className="text-sm text-gray-500">Plan for {plan.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {user?.id === plan?.userId && (
                        <>
                          <button
                              onClick={() => deleteLearningPlan(plan)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <AiFillDelete size={20} />
                          </button>
                          <button
                              onClick={() => navigateEditPage(plan)}
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <AiFillEdit size={20} />
                          </button>
                        </>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Learning Plan</p>
                      <p className="text-lg font-semibold">{plan.learningPlanName}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Subjects</p>
                      <p className="text-lg font-semibold">{plan.subjects}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Hours / Day</p>
                      <p className="text-lg font-semibold">{plan.hoursPerDay}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Schedule</p>
                      <p className="text-lg font-semibold">{plan.schedule}</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Plan Description</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default LearningPlan;
