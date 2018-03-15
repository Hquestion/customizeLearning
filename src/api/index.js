import wepy from 'wepy'
import httpService from '../util/httpService'

/**
 * 登陆接口
 * 前端先调用微信小程序登陆接口，获取code，再通过code实现服务器登陆
 */
export function login() {
    return new Promise((resolve, reject) => {
        wepy.login({
            success(res) {
                if (res.code) {
                    httpService.get('api/UserBaseInfo/UserBindWeChatByCode', {
                        code: res.code
                    }).then(res => {
                        resolve(res.ResultObj)
                    }, reject)
                }
            },
            fail(res) {
                wepy.showToast({
                    title: '登陆失败',
                    icon: 'none'
                })
                reject(res)
            }
        })
    })
}

/**
 * 用户绑定注册接口
 * @param data
 * @returns {*}
 */
export function userRegister(data) {
    return new Promise((resolve, reject) => {
        httpService.post('api/UserBaseInfo/UserBindWeChatSmallProgram', {
            OpenId: data.openid,
            SFZH: data.SFZH,
            XM: data.XM,
            nickName: data.nickName,
            avatarUrl: data.avatarUrl,
            gender: data.gender,
            city: '',
            province: '',
            Country: '',
            UnionId: ''
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 根据学校获取课程类别
 * @param schoolId
 * @returns {*}
 */
export function getCourseCateBySchool(schoolId) {
    return httpService.get('api/CourseInfo/GetCourseCategoryViewBySchool', {
        schoolFID: schoolId
    })
}

/**
 * 根据课程类别获取课程列表
 * @param categoryId
 * @param schoolFID
 * @returns {Promise<any>}
 */
export function getCoursesByCategory(categoryId, schoolFID) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseInfo/GetPageListCourseInfo', {
            SchoolFID: schoolFID,
            CourseType: categoryId,
            IsAudited: true,
            IsOpen: false,
            Page: {
                PageIndex: 1,
                PageSize: 9999
            }
        }).then(res => {
            if (res.Flag) {
                resolve(res.ResultObj.DataSource)
            } else {
                reject(res)
            }
        }, reject)
    })
}

/**
 * 根据课程id获取课程详情
 * @param courseId
 * @returns {Promise<any>}
 */
export function getCourseDetailById(courseId) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseInfo/GetCourseInfoDetails', {
            courseFID: courseId
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 根据课程id获取完成课程的任务列表
 * @param courseId
 * @returns {Promise<any>}
 */
export function getSuccessTasksByCourseId(courseId) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetCourseGroupCompleteByCourseID', {
            courseFID: courseId
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 根据学生id和课程id获取同学列表
 * @param studentFID
 * @param courseFID
 * @returns {Promise<any>}
 */
export function getClassmateList(studentFID, courseFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetGroupSelectMembersViewByStudentCourse?studentFID={studentFID}&courseFID={courseFID}', {
            studentFID: studentFID,
            courseFID: courseFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 根据课程创建小组
 * @param data
 * @returns {Promise<any>}
 */
export function createCourseGroup(data) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/CreateCourseGroup', data).then(res => {
            resolve(res)
        }, reject)
    })
}
