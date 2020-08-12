const adminPaths = {
    myTutorialListPath: (tutorialID) => `/admin/tutorials/${tutorialID}`,
    addLessonPath: (tutorialID, chapterID) => `/admin/tutorials/${tutorialID}/${chapterID}/add-lesson`,
    updateLessonPath: (tutorialID, chapterID, lessonID) => `/admin/tutorials/${tutorialID}/${chapterID}/${lessonID}/update`,
}

export default adminPaths;