/*
  Warnings:

  - You are about to drop the `AssignedCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Homework` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HomeworkSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LastActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LessonBolim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LessonFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LessonView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchasedCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignedCourse" DROP CONSTRAINT "AssignedCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedCourse" DROP CONSTRAINT "AssignedCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_cursecategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_lessonGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "Homework" DROP CONSTRAINT "Homework_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "HomeworkSubmission" DROP CONSTRAINT "HomeworkSubmission_homeworkId_fkey";

-- DropForeignKey
ALTER TABLE "HomeworkSubmission" DROP CONSTRAINT "HomeworkSubmission_userId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_courseId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_groupId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_groupId_fkey";

-- DropForeignKey
ALTER TABLE "LessonBolim" DROP CONSTRAINT "LessonBolim_courseId_fkey";

-- DropForeignKey
ALTER TABLE "LessonFile" DROP CONSTRAINT "LessonFile_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LessonView" DROP CONSTRAINT "LessonView_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LessonView" DROP CONSTRAINT "LessonView_userId_fkey";

-- DropForeignKey
ALTER TABLE "MentorProfile" DROP CONSTRAINT "MentorProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedCourse" DROP CONSTRAINT "PurchasedCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedCourse" DROP CONSTRAINT "PurchasedCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropTable
DROP TABLE "AssignedCourse";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "ExamResult";

-- DropTable
DROP TABLE "Homework";

-- DropTable
DROP TABLE "HomeworkSubmission";

-- DropTable
DROP TABLE "LastActivity";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "LessonBolim";

-- DropTable
DROP TABLE "LessonFile";

-- DropTable
DROP TABLE "LessonView";

-- DropTable
DROP TABLE "MentorProfile";

-- DropTable
DROP TABLE "PurchasedCourse";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionAnswer";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "fullName" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentorprofiles" (
    "id" TEXT NOT NULL,
    "about" TEXT,
    "job" TEXT,
    "experience" INTEGER NOT NULL,
    "telegram" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "facebook" TEXT,
    "github" TEXT,
    "website" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "mentorprofiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "banner" TEXT NOT NULL,
    "introVideo" TEXT,
    "level" "CourseLevel" NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "cursecategoryId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assigncourses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assigncourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchasedcourses" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "paidVia" "PaidVia" NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchasedcourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lastactivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT,
    "groupId" TEXT,
    "lessonId" TEXT,
    "url" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lastactivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonbolim" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lessonbolim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonview" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "view" BOOLEAN NOT NULL,

    CONSTRAINT "lessonview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonfiles" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "note" TEXT,
    "lessonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lessonfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeworks" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "file" TEXT,
    "lessonId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "homeworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeworksubmissions" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "file" TEXT NOT NULL,
    "reason" TEXT,
    "status" "HomeworkSubStatus" NOT NULL DEFAULT 'PENDING',
    "homeworkId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "homeworksubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "variantA" TEXT NOT NULL,
    "variantB" TEXT NOT NULL,
    "variantC" TEXT NOT NULL,
    "variantD" TEXT NOT NULL,
    "answer" "ExamAnswer" NOT NULL,
    "lessonBolimId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examresults" (
    "id" TEXT NOT NULL,
    "lessonBolimId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "corrects" INTEGER NOT NULL,
    "wrongs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "examresults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "file" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questionsanswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "file" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questionsanswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "mentorprofiles_userId_key" ON "mentorprofiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "lastactivity_userId_key" ON "lastactivity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "homeworks_lessonId_key" ON "homeworks"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "questionsanswer_questionId_key" ON "questionsanswer"("questionId");

-- AddForeignKey
ALTER TABLE "mentorprofiles" ADD CONSTRAINT "mentorprofiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_cursecategoryId_fkey" FOREIGN KEY ("cursecategoryId") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigncourses" ADD CONSTRAINT "assigncourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigncourses" ADD CONSTRAINT "assigncourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasedcourses" ADD CONSTRAINT "purchasedcourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasedcourses" ADD CONSTRAINT "purchasedcourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "lessonbolim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonbolim" ADD CONSTRAINT "lessonbolim_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "lessonbolim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonview" ADD CONSTRAINT "lessonview_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonview" ADD CONSTRAINT "lessonview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonfiles" ADD CONSTRAINT "lessonfiles_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeworks" ADD CONSTRAINT "homeworks_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeworksubmissions" ADD CONSTRAINT "homeworksubmissions_homeworkId_fkey" FOREIGN KEY ("homeworkId") REFERENCES "homeworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeworksubmissions" ADD CONSTRAINT "homeworksubmissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_lessonBolimId_fkey" FOREIGN KEY ("lessonBolimId") REFERENCES "lessonbolim"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examresults" ADD CONSTRAINT "examresults_lessonBolimId_fkey" FOREIGN KEY ("lessonBolimId") REFERENCES "lessonbolim"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examresults" ADD CONSTRAINT "examresults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questionsanswer" ADD CONSTRAINT "questionsanswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questionsanswer" ADD CONSTRAINT "questionsanswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
