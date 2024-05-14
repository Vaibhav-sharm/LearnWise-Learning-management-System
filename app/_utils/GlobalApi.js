const { gql, request } = require('graphql-request');

const Master_URL = "https://api-ap-south-1.hygraph.com/v2/" + process.env.NEXT_PUBLIC_HYGRAPH_API_KEY + "/master"

const getAllCourseList = async () => {
  const query = gql`query CourseLists {
        courseLists(first: 20, orderBy: createdAt_DESC) {
          name
          author
          id
          free
          description
          demoUrl
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              video {
                url
              }
            }
          }
          totalChapters
          sourceCode
          tag
          slug
        }
      }
      `
  const result = await request(Master_URL, query);
  return result;
}

const getSideBanner = async () => {
  const query = gql`query GetSideBanner {
        sideBanners {
          id
          name
          banner {
            id
            url
          }
          url
        }
      }
      `
  const result = await request(Master_URL, query);
  return result;
}

const getCourseById = async (courseId) => {
  const query = gql`query MyQuery {
        courseList(where: {slug: "`+ courseId + `"}) {
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              video {
                url
              }
            }
          }
          id
          name
          demoUrl
          description
          free
          slug
          sourceCode
          tag
          totalChapters
          author
        }
      }
      `
  const result = await request(Master_URL, query);
  return result;
}

const enrollToCourse = async (courseId, email,) => {
  const query = gql`
  mutation MyMutation {
    createUserEnrollCourse(
      data: {courseId: "`+ courseId + `", userEmail: "` + email + `", courseList: {connect: {slug: "` + courseId + `"}}}
    ) {
      id
    }
    publishManyUserEnrollCoursesConnection {
      edges {
        node {
          id
        }
      }
    }
  }
  `
  const result = await request(Master_URL, query);
  return result;
}

const checkUserEnrolledToCourse = async (courseId, email) => {
  const query = gql`
  query MyQuery {
    userEnrollCourses(where: {courseId: "`+ courseId + `", userEmail: "` + email + `"}) {
      id
    }
  }
  `
  const result = await request(Master_URL, query);
  return result;
}

const getUserEnrollCourseDetails = async (id, email) => {
  const query = gql`
  query MyQuery {
    userEnrollCourses(where: {id: "`+ id + `", userEmail: "` + email + `"}) {
      courseId
      id
      userEmail
      completeChapter {
        ... on CompleteChapter {
          id
          chapterId
        }
      }
      courseList {
        author
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            shortDesc
            video {
              url
            }
          }
        }
        demoUrl
        description
        free
        id
        name
        slug
        sourceCode
        totalChapters
      }
    }
  }  
  `
  const result = await request(Master_URL, query);
  return result;
}

const markChapterCompleted = async (enrollId, chapterId) => {
  const query = gql`
  mutation MyMutation {
    updateUserEnrollCourse(
      data: {completeChapter: {create: {CompleteChapter: {data: {chapterId: "`+ chapterId + `"}}}}}
      where: {id: "`+ enrollId + `"}
    ){
      id
    }
    publishUserEnrollCourse(where: {id: "`+ enrollId + `"}) {
      id
    }
  }
  `
  const result = await request(Master_URL, query);
  return result;
}

const getUserAllEnrolledCourseList = async (email) => {
  const query = gql`
  query MyQuery {
    userEnrollCourses(where: {userEmail: "`+ email + `"}) {
      completeChapter {
        ... on CompleteChapter {
          id
        }
      }
      courseId
      courseList {
        id
        name
        totalChapters
        slug
        sourceCode
        free
        description
        demoUrl
        chapter (first:50){
          ... on Chapter {
            id
            name
          }
        }
        banner {
          url
        }
        author
      }
    }
  }
  `
  const result = await request(Master_URL, query);
  return result;
}

const addNewMember = async (email, paymentId) => {
  const query = gql`
  mutation MyMutation {
    createMembership(data: {active: true, email: "`+ email + `", paymentId: "` + paymentId + `"}) {
      id
    }
    publishManyMemberships(to: PUBLISHED) {
        count
      }
  }
  `
  const result = await request(Master_URL, query);
  return result;
}

const checkForMembership= async(email)=>{
  const query = gql`
  query MyQuery {
    memberships(where: {email: "`+email+`"}) {
      email
      id
      paymentId
      createdAt
    }
  }
  `
  const result = await request(Master_URL, query);
  return result;
}

export default {
  getAllCourseList, getSideBanner, getCourseById, enrollToCourse, checkUserEnrolledToCourse, getUserEnrollCourseDetails,
  markChapterCompleted, getUserAllEnrolledCourseList, addNewMember, checkForMembership
}