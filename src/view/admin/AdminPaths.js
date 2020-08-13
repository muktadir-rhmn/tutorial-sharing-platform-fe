const adminPaths = {
    createCategoryPath: () => `/admin/hierarchy/create-category`,
    updateCategoryPath: () => `/admin/hierarchy/update-category`,
    myTutorialListPath: (tutorialID) => `/admin/tutorials/${tutorialID}`,
    updateTutorialPath: (tutorialID) => `/admin/tutorials/${tutorialID}/update`,
    addLessonPath: (tutorialID, chapterID) => `/admin/tutorials/${tutorialID}/${chapterID}/add-lesson`,
    updateLessonPath: (tutorialID, chapterID, lessonID) => `/admin/tutorials/${tutorialID}/${chapterID}/${lessonID}/update`,
}

export default adminPaths;