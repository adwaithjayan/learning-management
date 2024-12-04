"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCoursesQuery } from "@/state/api";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/courseCardSearch";
import SelectedCourse from "@/app/(nondashboard)/search/SelectedCourse";

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  const [selectedCourses, setSelectedCourses] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (courses) {
      if (id) {
        const course = courses.find((c) => c.courseId === id);
        setSelectedCourses(course || courses[0]);
      } else {
        setSelectedCourses(courses[0]);
      }
    }
  }, [courses, id]);

  if (isLoading) return <Loading />;

  if (isError || !courses) return <div>Failed to fetch courses</div>;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourses(course);
    router.push(`/search?id=${course.courseId}`,{scroll:false});
  };

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step1&id=${courseId}&showSignup=false`,{scroll:false});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtitle">{courses.length} courses available</h2>
      <div className="search__content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          className="search__courses-grid"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {courses.map((course, i) => (
            <CourseCardSearch
              course={course}
              isSelected={selectedCourses?.courseId === course.courseId}
              key={i}
              onClick={() => handleCourseSelect(course)}
            />
          ))}
        </motion.div>
        {selectedCourses && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            className="search__selected-course"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SelectedCourse
              course={selectedCourses}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
export default Search;
