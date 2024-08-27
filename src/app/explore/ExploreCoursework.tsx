import MyCourseworkGrid from "./CourseworkGrid";

function ExploreCoursework() {
  return (
    <div>
      <MyCourseworkGrid
        title="Explore coursework"
        currentUser={false}
        // courseWorkType="EE"
      />
    </div>
  );
}

export default ExploreCoursework;
