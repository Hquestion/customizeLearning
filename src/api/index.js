import httpService from '../util/httpService'

export function login() {
    httpService.get()
}

export function getCourseCateBySchool(schoolId) {
    return httpService.get('api/CourseInfo/GetCourseCategoryViewBySchool', {
        schoolFID: schoolId
    })
}
