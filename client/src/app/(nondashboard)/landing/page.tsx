"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/courseCardSearch";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title" />
          <Skeleton className="landing-skeleton__subtitle" />
          <Skeleton className="landing-skeleton__subtitle-secondary" />
          <Skeleton className="landing-skeleton__button" />
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>
      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />
        <div className="landing-skeleton__tags">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Skeleton className="landing-skeleton__tag" key={i} />
          ))}
        </div>
        <div className="landing-skeleton__courses">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton className="landing-skeleton__course-card" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const currentImage = useCarousel({ totalImages: 3 });
  const { user } = useUser();
  console.log(user);

  const router = useRouter();

  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`,{scroll: false});
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__hero-title">Courses</h1>
          <p className="landing__description">
            This is the list of the courses you can enroll in.
            <br />
            Courses when you need them and want them
          </p>
          <div className="landing__cta">
            <Link href="/search" scroll={false}>
              <div className="landing__cta-button">Search for Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, i) => (
            <Image
              src={src}
              alt={`Hero baner ${i + 1}`}
              key={i}
              fill
              priority={i === currentImage}
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
              className={`landing__hero-image ${i === currentImage && "landing__hero-image--active"}`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        className="landing__featured"
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          From beginners to advance, in all industries, we have thr right
          courses just for you and preparing your entire journey for learning
          and making the most
        </p>
        <div className="landing__tags">
          {[
            "web development",
            "enterprise IT",
            "react nextjs",
            "backend development",
            "robotics",
          ].map((tag, i) => (
            <span key={i} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="landing__courses">
          {/*COURSES DISPLAY*/}
          {courses &&
            courses.slice(0.4).map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                className=""
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Landing;
