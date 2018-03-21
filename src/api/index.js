import wepy from 'wepy'
import httpService from '../util/httpService'
import config from '../config'

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
 * 检查学生是否已经加入该课程的某个小组
 * @param studentFID
 * @param courseFID
 * @returns {Promise<any>}
 */
export function isStuInCourseGroup(studentFID, courseFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetGroupSelectMembersViewByStudentCourse?studentFID={studentFID}&courseFID={courseFID}', {
            studentFID: studentFID,
            courseFID: courseFID
        }).then(res => {
            let stuList = res.ResultObj
            let stuDetail = stuList.find(item => {
                return item.StudentFID === studentFID
            })
            let isIn = !!stuDetail && !!stuDetail.GroupFID
            resolve(!!isIn)
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

/**
 * 获取学生详细信息
 * @param userFID
 * @returns {Promise<any>}
 */
export function getStuDetailInfo(userFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/UserBaseInfo/GetSignStudentInfoView', {
            userFID: userFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取首页学校/班级任务完成情况排行榜单
 * @param schoolFID
 * @param UserFID
 * @param LevelNum
 * @param GradeNum
 * @param ClassNum
 * @returns {Promise<any>}
 */
export function getCourseTaskOrderList(schoolFID, UserFID, LevelNum, GradeNum, ClassNum) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/GetPageListCourseGroupInfo', {
            'SchoolFID': schoolFID,
            'LevelNum': LevelNum || '',
            'GradeNum': GradeNum || '',
            'ClassNum': ClassNum || '',
            'UserFID': UserFID || '',
            'Page': {
                'PageIndex': 1,
                'PageSize': 9999
            }
        }).then(resolve, reject)
    })
}

/**
 * 点击任务小组
 * @param stuFID
 * @param groupFID
 * @param courseFID
 * @returns {Promise<any>}
 */
export function userPraise(stuFID, groupFID, courseFID) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/UserPraise', {
            'studentFID': stuFID,
            'groupFID': groupFID,
            'CourseFID': courseFID
        }).then(resolve, reject)
    })
}

/**
 * 取消点赞任务小组
 * @param stuFID
 * @param groupFID
 * @param courseFID
 * @returns {Promise<any>}
 */
export function userCancelPraise(stuFID, groupFID, courseFID) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/UserCanclePraise', {
            'studentFID': stuFID,
            'groupFID': groupFID,
            'CourseFID': courseFID
        }).then(resolve, reject)
    })
}

/**
 * 获取个人参与的课程任务
 * @param schoolFID
 * @param userFID
 * @returns {Promise<any>}
 */
export function getMyCourseTasks(schoolFID, userFID) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/GetPageListCourseGroupByUser', {
            'SchoolFID': schoolFID,
            'UserFID': userFID,
            'Page': {
                'PageIndex': 1,
                'PageSize': 9999
            }
        }).then(res => {
            resolve(res.ResultObj.DataSource || [])
        }, reject)
    })
}

/**
 * 激活任务
 * @param studentFID
 * @param groupFID
 * @param courseFID
 * @returns {Promise<any>}
 */
export function activateGroupTask(studentFID, groupFID, courseFID) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/UseActivationGroup', {
            studentFID: studentFID,
            groupFID: groupFID,
            CourseFID: courseFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 根据课程id获取早知道内容
 * @param courseId
 * @returns {Promise<any>}
 */
export function getPrevKnowByCourse(courseId) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseManage/GetSingleCourseKnows', {
            courseFID: courseId
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取用户当前激活的任务
 * @param userFID
 * @returns {Promise<any>}
 */
export function getCurrentActivateTask(userFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetCurryActivation', {
            userFID: userFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取小组任务详情
 * @param groupFID
 * @returns {Promise<any>}
 */
export function getGroupDetail(groupFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetSingleCourseGroup', {
            groupFID: groupFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取课程评分标准
 * @param courseFID
 * @returns {Promise<any>}
 */
export function getRemarkStandard(courseFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseManage/GetListCourseReflectConfigDetails', {
            courseFID: courseFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取会安排步骤列表
 * @param courseFID
 * @param groupFID
 * @returns {Promise<any>}
 */
export function getCourseArrangeList(courseFID, groupFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetListCourseGroupArrangeInfo', {
            courseFID: courseFID,
            groupFID: groupFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 删除会安排某一步骤
 * @param arrangeId
 * @returns {Promise<any>}
 */
export function deleteArrange(arrangeId) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/DeleteCourseArrangeInfo', {
            FLnkID: arrangeId
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 保存会安排修改
 * @param data   StepList
 * @returns {Promise<any>}
 */
export function saveGroupArrangeList(data) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/SaveCourseArrangeInfo', data).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取用户会反思内容
 * @param userFID
 * @param groupFID
 * @returns {Promise<any>}
 */
export function getThinkContent(userFID, groupFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetCrouseGroupReflectInfo', {
            userFID: userFID,
            groupFID: groupFID
        }).then(res => {
            resolve(res)
        }, reject)
    })
}

/**
 * 保存用户会反思内容
 * @param data
 * @returns {Promise<any>}
 */
export function saveThinkContent(data) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/SaveCrouseGroupReflectInfo', {
            FlnkID: data.FlnkID || '',
            StudentFID: data.StudentFID,
            StudentName: data.StudentName,
            ReflectContent: data.ReflectContent,
            GroupFID: data.GroupFID,
            CourseFID: data.CourseFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取用户提交的步骤明细
 * @param userFID
 * @param groupFID
 * @returns {Promise<any>}
 */
export function getUserSubmitSteps(userFID, groupFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetCourseGroupWorkArrangeInfoByStudent', {
            userFID: userFID,
            groupFID: groupFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 上传图片/音频/视频等资源
 * @param filePath
 * @param param
 * @returns {Promise<any>}
 */
export function uploadFile(filePath, param) {
    return new Promise((resolve, reject) => {
        httpService.uploadFile('api/File/UploadMessageFile', filePath, param).then(res => {
            console.log(res)
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 分页获取聊天记录
 * @param GroupFID
 * @param UserFID
 * @param pageIndex
 * @param RoleNum
 * @returns {Promise<any>}
 */
export function getChatMsgByPage(GroupFID, UserFID, RoleNum, pageIndex) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/GetPageChatMessage', {
            GroupFID: GroupFID,
            UserFID: UserFID || null,
            RoleNum: RoleNum || null,
            Page: {
                PageIndex: pageIndex || 1,
                PageSize: config.chatMsgPageSize || 20
            }
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 删除聊天消息
 * @param MessageFID
 * @param UserFID
 * @returns {Promise<any>}
 */
export function deleteChatMsg(MessageFID, UserFID) {
    return new Promise((resolve, reject) => {
        httpService.post('api/CourseGroup/DeleteChatMessage', {
            MessageFID: MessageFID,
            UserFID: UserFID
        }).then(res => {
            resolve(res.ResultObj)
        }, reject)
    })
}

/**
 * 获取小组老师评分详情
 * @param groupFID
 * @returns {Promise<any>}
 */
export function getTeacherRemarkByGroup(groupFID) {
    return new Promise((resolve, reject) => {
        httpService.get('api/CourseGroup/GetListCrouseGroupReflectScoreView', {
            groupFID: groupFID
        }).then(res => {
            resolve(res.ResultObj)
        }, (res) => {
            reject(res)
        })
    })
}
