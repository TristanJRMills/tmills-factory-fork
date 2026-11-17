// The Lesson page's server-side reads and writes. The route asks this module
// for the Lesson's data instead of querying it itself.
export {
  getCourseForLesson,
  getCourseWithDetails,
  getLessonById,
  getModuleById,
  getUserById,
} from "./lib/course.server";
export {
  calculateWatchProgress,
  getLastWatchPosition,
  getLessonProgress,
  getLessonProgressForCourse,
  markLessonComplete,
  markLessonInProgress,
} from "./lib/progress.server";
export {
  computeResult,
  getBestAttempt,
  getQuizByLessonId,
  getQuizForLesson,
  getQuizWithQuestions,
} from "./lib/quiz.server";
export {
  getCommentById,
  getLessonThread,
  renderThread,
} from "./lib/thread.server";
