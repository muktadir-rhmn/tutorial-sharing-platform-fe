const viewerPaths = {
    tutorialPath: (tutorialID) => `/tutorials/${tutorialID}`,
    lessonPath: (tutorialID, chapterID, lessonID) => `/tutorials/${tutorialID}/${chapterID}/${lessonID}`,
}

export default viewerPaths;