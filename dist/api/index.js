'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = login;
exports.userRegister = userRegister;
exports.getCourseCateBySchool = getCourseCateBySchool;
exports.getCoursesByCategory = getCoursesByCategory;
exports.getCourseDetailById = getCourseDetailById;
exports.getSuccessTasksByCourseId = getSuccessTasksByCourseId;
exports.getClassmateList = getClassmateList;
exports.isStuInCourseGroup = isStuInCourseGroup;
exports.createCourseGroup = createCourseGroup;
exports.getStuDetailInfo = getStuDetailInfo;
exports.getCourseTaskOrderList = getCourseTaskOrderList;
exports.userPraise = userPraise;
exports.userCancelPraise = userCancelPraise;
exports.getMyCourseTasks = getMyCourseTasks;
exports.activateGroupTask = activateGroupTask;
exports.getPrevKnowByCourse = getPrevKnowByCourse;
exports.getCurrentActivateTask = getCurrentActivateTask;
exports.getGroupDetail = getGroupDetail;
exports.getRemarkStandard = getRemarkStandard;
exports.getCourseArrangeList = getCourseArrangeList;
exports.deleteArrange = deleteArrange;
exports.saveGroupArrangeList = saveGroupArrangeList;
exports.getThinkContent = getThinkContent;
exports.saveThinkContent = saveThinkContent;
exports.getUserSubmitSteps = getUserSubmitSteps;
exports.uploadFile = uploadFile;
exports.getChatMsgByPage = getChatMsgByPage;
exports.deleteChatMsg = deleteChatMsg;
exports.getTeacherRemarkByGroup = getTeacherRemarkByGroup;
exports.cancelBind = cancelBind;
exports.getGroupMembers = getGroupMembers;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _httpService = require('./../util/httpService.js');

var _httpService2 = _interopRequireDefault(_httpService);

var _config = require('./../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 登陆接口
 * 前端先调用微信小程序登陆接口，获取code，再通过code实现服务器登陆
 */
function login() {
    return new Promise(function (resolve, reject) {
        _wepy2.default.login({
            success: function success(res) {
                if (res.code) {
                    _httpService2.default.get('api/UserBaseInfo/UserBindWeChatByCode', {
                        code: res.code
                    }).then(function (res) {
                        resolve(res.ResultObj);
                    }, reject);
                }
            },
            fail: function fail(res) {
                _wepy2.default.showToast({
                    title: '登陆失败',
                    icon: 'none'
                });
                reject(res);
            }
        });
    });
}

/**
 * 用户绑定注册接口
 * @param data
 * @returns {*}
 */
function userRegister(data) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/UserBaseInfo/UserBindWeChatSmallProgram', {
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
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 根据学校获取课程类别
 * @param schoolId
 * @returns {*}
 */
function getCourseCateBySchool(schoolId) {
    return _httpService2.default.get('api/CourseInfo/GetCourseCategoryViewBySchool', {
        schoolFID: schoolId
    });
}

/**
 * 根据课程类别获取课程列表
 * @param categoryId
 * @param schoolFID
 * @returns {Promise<any>}
 */
function getCoursesByCategory(categoryId, schoolFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseInfo/GetPageListCourseInfo', {
            SchoolFID: schoolFID,
            CourseType: categoryId,
            IsAudited: true,
            IsOpen: false,
            Page: {
                PageIndex: 1,
                PageSize: 9999
            }
        }).then(function (res) {
            if (res.Flag) {
                resolve(res.ResultObj.DataSource);
            } else {
                reject(res);
            }
        }, reject);
    });
}

/**
 * 根据课程id获取课程详情
 * @param courseId
 * @returns {Promise<any>}
 */
function getCourseDetailById(courseId) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseInfo/GetCourseInfoDetails', {
            courseFID: courseId
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 根据课程id获取完成课程的任务列表
 * @param courseId
 * @returns {Promise<any>}
 */
function getSuccessTasksByCourseId(courseId) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetCourseGroupCompleteByCourseID', {
            courseFID: courseId
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 根据学生id和课程id获取同学列表
 * @param studentFID
 * @param courseFID
 * @returns {Promise<any>}
 */
function getClassmateList(studentFID, courseFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetGroupSelectMembersViewByStudentCourse', {
            studentFID: studentFID,
            courseFID: courseFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 检查学生是否已经加入该课程的某个小组
 * @param studentFID
 * @param courseFID
 * @returns {Promise<any>}
 */
function isStuInCourseGroup(studentFID, courseFID, groupFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetGroupSelectMembersViewByStudentCourse', {
            studentFID: studentFID,
            courseFID: courseFID
        }).then(function (res) {
            var stuList = res.ResultObj;
            var stuDetail = stuList.find(function (item) {
                return item.StudentFID === studentFID;
            });
            var isIn = void 0;
            if (stuDetail) {
                if (stuDetail.GroupFID) {
                    if (groupFID) {
                        isIn = stuDetail.GroupFID === groupFID;
                    } else {
                        isIn = true;
                    }
                } else {
                    isIn = false;
                }
            } else {
                isIn = false;
            }
            resolve(!!isIn);
        }, reject);
    });
}

/**
 * 根据课程创建小组
 * @param data
 * @returns {Promise<any>}
 */
function createCourseGroup(data) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/CreateCourseGroup', data).then(function (res) {
            resolve(res);
        }, reject);
    });
}

/**
 * 获取学生详细信息
 * @param userFID
 * @returns {Promise<any>}
 */
function getStuDetailInfo(userFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/UserBaseInfo/GetSignStudentInfoView', {
            userFID: userFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
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
function getCourseTaskOrderList(schoolFID, UserFID, LevelNum, GradeNum, ClassNum) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/GetPageListCourseGroupInfo', {
            'SchoolFID': schoolFID,
            'LevelNum': LevelNum || '',
            'GradeNum': GradeNum || '',
            'ClassNum': ClassNum || '',
            'UserFID': UserFID || '',
            'Page': {
                'PageIndex': 1,
                'PageSize': 9999
            }
        }).then(resolve, reject);
    });
}

/**
 * 点击任务小组
 * @param stuFID
 * @param groupFID
 * @param courseFID
 * @returns {Promise<any>}
 */
function userPraise(stuFID, groupFID, courseFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/UserPraise', {
            'studentFID': stuFID,
            'groupFID': groupFID,
            'CourseFID': courseFID
        }).then(resolve, reject);
    });
}

/**
 * 取消点赞任务小组
 * @param stuFID
 * @param groupFID
 * @param courseFID
 * @returns {Promise<any>}
 */
function userCancelPraise(stuFID, groupFID, courseFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/UserCanclePraise', {
            'studentFID': stuFID,
            'groupFID': groupFID,
            'CourseFID': courseFID
        }).then(resolve, reject);
    });
}

/**
 * 获取个人参与的课程任务
 * @param schoolFID
 * @param userFID
 * @returns {Promise<any>}
 */
function getMyCourseTasks(schoolFID, userFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/GetPageListCourseGroupByUser', {
            'SchoolFID': schoolFID,
            'UserFID': userFID,
            'Page': {
                'PageIndex': 1,
                'PageSize': 9999
            }
        }).then(function (res) {
            resolve(res.ResultObj.DataSource || []);
        }, reject);
    });
}

/**
 * 激活任务
 * @param studentFID
 * @param groupFID
 * @param courseFID
 * @returns {Promise<any>}
 */
function activateGroupTask(studentFID, groupFID, courseFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/UseActivationGroup', {
            studentFID: studentFID,
            groupFID: groupFID,
            CourseFID: courseFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 根据课程id获取早知道内容
 * @param courseId
 * @returns {Promise<any>}
 */
function getPrevKnowByCourse(courseId) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseManage/GetSingleCourseKnows', {
            courseFID: courseId
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取用户当前激活的任务
 * @param userFID
 * @returns {Promise<any>}
 */
function getCurrentActivateTask(userFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetCurryActivation', {
            userFID: userFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取小组任务详情
 * @param groupFID
 * @returns {Promise<any>}
 */
function getGroupDetail(groupFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetSingleCourseGroup', {
            groupFID: groupFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取课程评分标准
 * @param courseFID
 * @returns {Promise<any>}
 */
function getRemarkStandard(courseFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseManage/GetListCourseReflectConfigDetails', {
            courseFID: courseFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取会安排步骤列表
 * @param courseFID
 * @param groupFID
 * @returns {Promise<any>}
 */
function getCourseArrangeList(courseFID, groupFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetListCourseGroupArrangeInfo', {
            courseFID: courseFID,
            groupFID: groupFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 删除会安排某一步骤
 * @param arrangeId
 * @returns {Promise<any>}
 */
function deleteArrange(arrangeId) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/DeleteCourseArrangeInfo', {
            FLnkID: arrangeId
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 保存会安排修改
 * @param data   StepList
 * @returns {Promise<any>}
 */
function saveGroupArrangeList(data) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/SaveCourseArrangeInfo', data).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取用户会反思内容
 * @param userFID
 * @param groupFID
 * @returns {Promise<any>}
 */
function getThinkContent(userFID, groupFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetCrouseGroupReflectInfo', {
            userFID: userFID,
            groupFID: groupFID
        }).then(function (res) {
            resolve(res);
        }, reject);
    });
}

/**
 * 保存用户会反思内容
 * @param data
 * @returns {Promise<any>}
 */
function saveThinkContent(data) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/SaveCrouseGroupReflectInfo', {
            FlnkID: data.FlnkID || '',
            StudentFID: data.StudentFID,
            StudentName: data.StudentName,
            ReflectContent: data.ReflectContent,
            GroupFID: data.GroupFID,
            CourseFID: data.CourseFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取用户提交的步骤明细
 * @param userFID
 * @param groupFID
 * @returns {Promise<any>}
 */
function getUserSubmitSteps(userFID, groupFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetCourseGroupWorkArrangeInfoByStudent', {
            userFID: userFID,
            groupFID: groupFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 上传图片/音频/视频等资源
 * @param filePath
 * @param param
 * @returns {Promise<any>}
 */
function uploadFile(filePath, param) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.uploadFile('api/File/UploadMessageFile', filePath, param).then(function (res) {
            console.log(res);
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 分页获取聊天记录
 * @param GroupFID
 * @param UserFID
 * @param pageIndex
 * @param RoleNum
 * @returns {Promise<any>}
 */
function getChatMsgByPage(GroupFID, UserFID, RoleNum, pageIndex) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/GetPageChatMessage', {
            GroupFID: GroupFID,
            UserFID: UserFID || null,
            RoleNum: RoleNum || null,
            Page: {
                PageIndex: pageIndex || 1,
                PageSize: _config2.default.chatMsgPageSize || 20
            }
        }, { ignoreLoading: true }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 删除聊天消息
 * @param MessageFID
 * @param UserFID
 * @returns {Promise<any>}
 */
function deleteChatMsg(MessageFID, UserFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/CourseGroup/DeleteChatMessage', {
            MessageFID: MessageFID,
            UserFID: UserFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, reject);
    });
}

/**
 * 获取小组老师评分详情
 * @param groupFID
 * @returns {Promise<any>}
 */
function getTeacherRemarkByGroup(groupFID) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetListCrouseGroupReflectScoreView', {
            groupFID: groupFID
        }).then(function (res) {
            resolve(res.ResultObj);
        }, function (res) {
            reject(res);
        });
    });
}

/**
 * 解除绑定
 * @param userId
 * @returns {Promise<any>}
 */
function cancelBind(userId) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.post('api/UserBaseInfo/CancleBindWeChat', {
            FLnkID: userId
        }).then(function (res) {
            resolve(res.ResultObj);
        }, function (res) {
            reject(res);
        });
    });
}

/**
 * 获取小组所有成员
 * @param groupId
 * @returns {Promise<any>}
 */
function getGroupMembers(groupId) {
    return new Promise(function (resolve, reject) {
        _httpService2.default.get('api/CourseGroup/GetListGroupMembersByGroup', {
            groupFID: groupId
        }).then(function (res) {
            resolve(res.ResultObj);
        }, function (res) {
            reject(res);
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImxvZ2luIiwidXNlclJlZ2lzdGVyIiwiZ2V0Q291cnNlQ2F0ZUJ5U2Nob29sIiwiZ2V0Q291cnNlc0J5Q2F0ZWdvcnkiLCJnZXRDb3Vyc2VEZXRhaWxCeUlkIiwiZ2V0U3VjY2Vzc1Rhc2tzQnlDb3Vyc2VJZCIsImdldENsYXNzbWF0ZUxpc3QiLCJpc1N0dUluQ291cnNlR3JvdXAiLCJjcmVhdGVDb3Vyc2VHcm91cCIsImdldFN0dURldGFpbEluZm8iLCJnZXRDb3Vyc2VUYXNrT3JkZXJMaXN0IiwidXNlclByYWlzZSIsInVzZXJDYW5jZWxQcmFpc2UiLCJnZXRNeUNvdXJzZVRhc2tzIiwiYWN0aXZhdGVHcm91cFRhc2siLCJnZXRQcmV2S25vd0J5Q291cnNlIiwiZ2V0Q3VycmVudEFjdGl2YXRlVGFzayIsImdldEdyb3VwRGV0YWlsIiwiZ2V0UmVtYXJrU3RhbmRhcmQiLCJnZXRDb3Vyc2VBcnJhbmdlTGlzdCIsImRlbGV0ZUFycmFuZ2UiLCJzYXZlR3JvdXBBcnJhbmdlTGlzdCIsImdldFRoaW5rQ29udGVudCIsInNhdmVUaGlua0NvbnRlbnQiLCJnZXRVc2VyU3VibWl0U3RlcHMiLCJ1cGxvYWRGaWxlIiwiZ2V0Q2hhdE1zZ0J5UGFnZSIsImRlbGV0ZUNoYXRNc2ciLCJnZXRUZWFjaGVyUmVtYXJrQnlHcm91cCIsImNhbmNlbEJpbmQiLCJnZXRHcm91cE1lbWJlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiZ2V0IiwidGhlbiIsIlJlc3VsdE9iaiIsImZhaWwiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkYXRhIiwicG9zdCIsIk9wZW5JZCIsIm9wZW5pZCIsIlNGWkgiLCJYTSIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwiZ2VuZGVyIiwiY2l0eSIsInByb3ZpbmNlIiwiQ291bnRyeSIsIlVuaW9uSWQiLCJzY2hvb2xJZCIsInNjaG9vbEZJRCIsImNhdGVnb3J5SWQiLCJTY2hvb2xGSUQiLCJDb3Vyc2VUeXBlIiwiSXNBdWRpdGVkIiwiSXNPcGVuIiwiUGFnZSIsIlBhZ2VJbmRleCIsIlBhZ2VTaXplIiwiRmxhZyIsIkRhdGFTb3VyY2UiLCJjb3Vyc2VJZCIsImNvdXJzZUZJRCIsInN0dWRlbnRGSUQiLCJncm91cEZJRCIsInN0dUxpc3QiLCJzdHVEZXRhaWwiLCJmaW5kIiwiaXRlbSIsIlN0dWRlbnRGSUQiLCJpc0luIiwiR3JvdXBGSUQiLCJ1c2VyRklEIiwiVXNlckZJRCIsIkxldmVsTnVtIiwiR3JhZGVOdW0iLCJDbGFzc051bSIsInN0dUZJRCIsIkNvdXJzZUZJRCIsImFycmFuZ2VJZCIsIkZMbmtJRCIsIkZsbmtJRCIsIlN0dWRlbnROYW1lIiwiUmVmbGVjdENvbnRlbnQiLCJmaWxlUGF0aCIsInBhcmFtIiwiY29uc29sZSIsImxvZyIsIlJvbGVOdW0iLCJwYWdlSW5kZXgiLCJjaGF0TXNnUGFnZVNpemUiLCJpZ25vcmVMb2FkaW5nIiwiTWVzc2FnZUZJRCIsInVzZXJJZCIsImdyb3VwSWQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBUWdCQSxLLEdBQUFBLEs7UUE0QkFDLFksR0FBQUEsWTtRQXdCQUMscUIsR0FBQUEscUI7UUFZQUMsb0IsR0FBQUEsb0I7UUEwQkFDLG1CLEdBQUFBLG1CO1FBZUFDLHlCLEdBQUFBLHlCO1FBZ0JBQyxnQixHQUFBQSxnQjtRQWlCQUMsa0IsR0FBQUEsa0I7UUFrQ0FDLGlCLEdBQUFBLGlCO1FBYUFDLGdCLEdBQUFBLGdCO1FBbUJBQyxzQixHQUFBQSxzQjtRQXVCQUMsVSxHQUFBQSxVO1FBaUJBQyxnQixHQUFBQSxnQjtRQWdCQUMsZ0IsR0FBQUEsZ0I7UUFzQkFDLGlCLEdBQUFBLGlCO1FBaUJBQyxtQixHQUFBQSxtQjtRQWVBQyxzQixHQUFBQSxzQjtRQWVBQyxjLEdBQUFBLGM7UUFlQUMsaUIsR0FBQUEsaUI7UUFnQkFDLG9CLEdBQUFBLG9CO1FBZ0JBQyxhLEdBQUFBLGE7UUFlQUMsb0IsR0FBQUEsb0I7UUFj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Q0FBaEIsRUFBOEQ7QUFDMURtQyxzQkFBVThCO0FBRGdELFNBQTlELEVBRUdoRSxJQUZILENBRVEsZUFBTztBQUNYTixvQkFBUUcsSUFBSUksU0FBWjtBQUNILFNBSkQsRUFJRyxVQUFDSixHQUFELEVBQVM7QUFDUkYsbUJBQU9FLEdBQVA7QUFDSCxTQU5EO0FBT0gsS0FSTSxDQUFQO0FBU0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgaHR0cFNlcnZpY2UgZnJvbSAnLi4vdXRpbC9odHRwU2VydmljZSdcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcblxyXG4vKipcclxuICog55m76ZmG5o6l5Y+jXHJcbiAqIOWJjeerr+WFiOiwg+eUqOW+ruS/oeWwj+eoi+W6j+eZu+mZhuaOpeWPo++8jOiOt+WPlmNvZGXvvIzlho3pgJrov4djb2Rl5a6e546w5pyN5Yqh5Zmo55m76ZmGXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9naW4oKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkubG9naW4oe1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvVXNlckJhc2VJbmZvL1VzZXJCaW5kV2VDaGF0QnlDb2RlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+mZhuWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog55So5oi357uR5a6a5rOo5YaM5o6l5Y+jXHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJSZWdpc3RlcihkYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Vc2VyQmFzZUluZm8vVXNlckJpbmRXZUNoYXRTbWFsbFByb2dyYW0nLCB7XHJcbiAgICAgICAgICAgIE9wZW5JZDogZGF0YS5vcGVuaWQsXHJcbiAgICAgICAgICAgIFNGWkg6IGRhdGEuU0ZaSCxcclxuICAgICAgICAgICAgWE06IGRhdGEuWE0sXHJcbiAgICAgICAgICAgIG5pY2tOYW1lOiBkYXRhLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICBhdmF0YXJVcmw6IGRhdGEuYXZhdGFyVXJsLFxyXG4gICAgICAgICAgICBnZW5kZXI6IGRhdGEuZ2VuZGVyLFxyXG4gICAgICAgICAgICBjaXR5OiAnJyxcclxuICAgICAgICAgICAgcHJvdmluY2U6ICcnLFxyXG4gICAgICAgICAgICBDb3VudHJ5OiAnJyxcclxuICAgICAgICAgICAgVW5pb25JZDogJydcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5qC55o2u5a2m5qCh6I635Y+W6K++56iL57G75YirXHJcbiAqIEBwYXJhbSBzY2hvb2xJZFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3Vyc2VDYXRlQnlTY2hvb2woc2Nob29sSWQpIHtcclxuICAgIHJldHVybiBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VJbmZvL0dldENvdXJzZUNhdGVnb3J5Vmlld0J5U2Nob29sJywge1xyXG4gICAgICAgIHNjaG9vbEZJRDogc2Nob29sSWRcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoLnmja7or77nqIvnsbvliKvojrflj5bor77nqIvliJfooahcclxuICogQHBhcmFtIGNhdGVnb3J5SWRcclxuICogQHBhcmFtIHNjaG9vbEZJRFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvdXJzZXNCeUNhdGVnb3J5KGNhdGVnb3J5SWQsIHNjaG9vbEZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlSW5mby9HZXRQYWdlTGlzdENvdXJzZUluZm8nLCB7XHJcbiAgICAgICAgICAgIFNjaG9vbEZJRDogc2Nob29sRklELFxyXG4gICAgICAgICAgICBDb3Vyc2VUeXBlOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICBJc0F1ZGl0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIElzT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIFBhZ2U6IHtcclxuICAgICAgICAgICAgICAgIFBhZ2VJbmRleDogMSxcclxuICAgICAgICAgICAgICAgIFBhZ2VTaXplOiA5OTk5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuRmxhZykge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqLkRhdGFTb3VyY2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOagueaNruivvueoi2lk6I635Y+W6K++56iL6K+m5oOFXHJcbiAqIEBwYXJhbSBjb3Vyc2VJZFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvdXJzZURldGFpbEJ5SWQoY291cnNlSWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlSW5mby9HZXRDb3Vyc2VJbmZvRGV0YWlscycsIHtcclxuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VJZFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxyXG4gICAgICAgIH0sIHJlamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmoLnmja7or77nqItpZOiOt+WPluWujOaIkOivvueoi+eahOS7u+WKoeWIl+ihqFxyXG4gKiBAcGFyYW0gY291cnNlSWRcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWNjZXNzVGFza3NCeUNvdXJzZUlkKGNvdXJzZUlkKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldENvdXJzZUdyb3VwQ29tcGxldGVCeUNvdXJzZUlEJywge1xyXG4gICAgICAgICAgICBjb3Vyc2VGSUQ6IGNvdXJzZUlkXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOagueaNruWtpueUn2lk5ZKM6K++56iLaWTojrflj5blkIzlrabliJfooahcclxuICogQHBhcmFtIHN0dWRlbnRGSURcclxuICogQHBhcmFtIGNvdXJzZUZJRFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzbWF0ZUxpc3Qoc3R1ZGVudEZJRCwgY291cnNlRklEKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldEdyb3VwU2VsZWN0TWVtYmVyc1ZpZXdCeVN0dWRlbnRDb3Vyc2UnLCB7XHJcbiAgICAgICAgICAgIHN0dWRlbnRGSUQ6IHN0dWRlbnRGSUQsXHJcbiAgICAgICAgICAgIGNvdXJzZUZJRDogY291cnNlRklEXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOajgOafpeWtpueUn+aYr+WQpuW3sue7j+WKoOWFpeivpeivvueoi+eahOafkOS4quWwj+e7hFxyXG4gKiBAcGFyYW0gc3R1ZGVudEZJRFxyXG4gKiBAcGFyYW0gY291cnNlRklEXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNTdHVJbkNvdXJzZUdyb3VwKHN0dWRlbnRGSUQsIGNvdXJzZUZJRCwgZ3JvdXBGSUQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlR3JvdXAvR2V0R3JvdXBTZWxlY3RNZW1iZXJzVmlld0J5U3R1ZGVudENvdXJzZScsIHtcclxuICAgICAgICAgICAgc3R1ZGVudEZJRDogc3R1ZGVudEZJRCxcclxuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VGSURcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHVMaXN0ID0gcmVzLlJlc3VsdE9ialxyXG4gICAgICAgICAgICBsZXQgc3R1RGV0YWlsID0gc3R1TGlzdC5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uU3R1ZGVudEZJRCA9PT0gc3R1ZGVudEZJRFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgaXNJblxyXG4gICAgICAgICAgICBpZiAoc3R1RGV0YWlsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3R1RGV0YWlsLkdyb3VwRklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwRklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSW4gPSBzdHVEZXRhaWwuR3JvdXBGSUQgPT09IGdyb3VwRklEXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNJbiA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzSW4gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXNJbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZSghIWlzSW4pXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOagueaNruivvueoi+WIm+W7uuWwj+e7hFxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvdXJzZUdyb3VwKGRhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL0NyZWF0ZUNvdXJzZUdyb3VwJywgZGF0YSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5a2m55Sf6K+m57uG5L+h5oGvXHJcbiAqIEBwYXJhbSB1c2VyRklEXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R1RGV0YWlsSW5mbyh1c2VyRklEKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL1VzZXJCYXNlSW5mby9HZXRTaWduU3R1ZGVudEluZm9WaWV3Jywge1xyXG4gICAgICAgICAgICB1c2VyRklEOiB1c2VyRklEXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlummlumhteWtpuagoS/nj63nuqfku7vliqHlrozmiJDmg4XlhrXmjpLooYzmppzljZVcclxuICogQHBhcmFtIHNjaG9vbEZJRFxyXG4gKiBAcGFyYW0gVXNlckZJRFxyXG4gKiBAcGFyYW0gTGV2ZWxOdW1cclxuICogQHBhcmFtIEdyYWRlTnVtXHJcbiAqIEBwYXJhbSBDbGFzc051bVxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvdXJzZVRhc2tPcmRlckxpc3Qoc2Nob29sRklELCBVc2VyRklELCBMZXZlbE51bSwgR3JhZGVOdW0sIENsYXNzTnVtKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9HZXRQYWdlTGlzdENvdXJzZUdyb3VwSW5mbycsIHtcclxuICAgICAgICAgICAgJ1NjaG9vbEZJRCc6IHNjaG9vbEZJRCxcclxuICAgICAgICAgICAgJ0xldmVsTnVtJzogTGV2ZWxOdW0gfHwgJycsXHJcbiAgICAgICAgICAgICdHcmFkZU51bSc6IEdyYWRlTnVtIHx8ICcnLFxyXG4gICAgICAgICAgICAnQ2xhc3NOdW0nOiBDbGFzc051bSB8fCAnJyxcclxuICAgICAgICAgICAgJ1VzZXJGSUQnOiBVc2VyRklEIHx8ICcnLFxyXG4gICAgICAgICAgICAnUGFnZSc6IHtcclxuICAgICAgICAgICAgICAgICdQYWdlSW5kZXgnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ1BhZ2VTaXplJzogOTk5OVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog54K55Ye75Lu75Yqh5bCP57uEXHJcbiAqIEBwYXJhbSBzdHVGSURcclxuICogQHBhcmFtIGdyb3VwRklEXHJcbiAqIEBwYXJhbSBjb3Vyc2VGSURcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VyUHJhaXNlKHN0dUZJRCwgZ3JvdXBGSUQsIGNvdXJzZUZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlR3JvdXAvVXNlclByYWlzZScsIHtcclxuICAgICAgICAgICAgJ3N0dWRlbnRGSUQnOiBzdHVGSUQsXHJcbiAgICAgICAgICAgICdncm91cEZJRCc6IGdyb3VwRklELFxyXG4gICAgICAgICAgICAnQ291cnNlRklEJzogY291cnNlRklEXHJcbiAgICAgICAgfSkudGhlbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Y+W5raI54K56LWe5Lu75Yqh5bCP57uEXHJcbiAqIEBwYXJhbSBzdHVGSURcclxuICogQHBhcmFtIGdyb3VwRklEXHJcbiAqIEBwYXJhbSBjb3Vyc2VGSURcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VyQ2FuY2VsUHJhaXNlKHN0dUZJRCwgZ3JvdXBGSUQsIGNvdXJzZUZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlR3JvdXAvVXNlckNhbmNsZVByYWlzZScsIHtcclxuICAgICAgICAgICAgJ3N0dWRlbnRGSUQnOiBzdHVGSUQsXHJcbiAgICAgICAgICAgICdncm91cEZJRCc6IGdyb3VwRklELFxyXG4gICAgICAgICAgICAnQ291cnNlRklEJzogY291cnNlRklEXHJcbiAgICAgICAgfSkudGhlbihyZXNvbHZlLCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5Liq5Lq65Y+C5LiO55qE6K++56iL5Lu75YqhXHJcbiAqIEBwYXJhbSBzY2hvb2xGSURcclxuICogQHBhcmFtIHVzZXJGSURcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNeUNvdXJzZVRhc2tzKHNjaG9vbEZJRCwgdXNlckZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlR3JvdXAvR2V0UGFnZUxpc3RDb3Vyc2VHcm91cEJ5VXNlcicsIHtcclxuICAgICAgICAgICAgJ1NjaG9vbEZJRCc6IHNjaG9vbEZJRCxcclxuICAgICAgICAgICAgJ1VzZXJGSUQnOiB1c2VyRklELFxyXG4gICAgICAgICAgICAnUGFnZSc6IHtcclxuICAgICAgICAgICAgICAgICdQYWdlSW5kZXgnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ1BhZ2VTaXplJzogOTk5OVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmouRGF0YVNvdXJjZSB8fCBbXSlcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5r+A5rS75Lu75YqhXHJcbiAqIEBwYXJhbSBzdHVkZW50RklEXHJcbiAqIEBwYXJhbSBncm91cEZJRFxyXG4gKiBAcGFyYW0gY291cnNlRklEXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGVHcm91cFRhc2soc3R1ZGVudEZJRCwgZ3JvdXBGSUQsIGNvdXJzZUZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlR3JvdXAvVXNlQWN0aXZhdGlvbkdyb3VwJywge1xyXG4gICAgICAgICAgICBzdHVkZW50RklEOiBzdHVkZW50RklELFxyXG4gICAgICAgICAgICBncm91cEZJRDogZ3JvdXBGSUQsXHJcbiAgICAgICAgICAgIENvdXJzZUZJRDogY291cnNlRklEXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOagueaNruivvueoi2lk6I635Y+W5pep55+l6YGT5YaF5a65XHJcbiAqIEBwYXJhbSBjb3Vyc2VJZFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZLbm93QnlDb3Vyc2UoY291cnNlSWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlTWFuYWdlL0dldFNpbmdsZUNvdXJzZUtub3dzJywge1xyXG4gICAgICAgICAgICBjb3Vyc2VGSUQ6IGNvdXJzZUlkXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiOt+WPlueUqOaIt+W9k+WJjea/gOa0u+eahOS7u+WKoVxyXG4gKiBAcGFyYW0gdXNlckZJRFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRBY3RpdmF0ZVRhc2sodXNlckZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRDdXJyeUFjdGl2YXRpb24nLCB7XHJcbiAgICAgICAgICAgIHVzZXJGSUQ6IHVzZXJGSURcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5bCP57uE5Lu75Yqh6K+m5oOFXHJcbiAqIEBwYXJhbSBncm91cEZJRFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEdyb3VwRGV0YWlsKGdyb3VwRklEKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldFNpbmdsZUNvdXJzZUdyb3VwJywge1xyXG4gICAgICAgICAgICBncm91cEZJRDogZ3JvdXBGSURcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W6K++56iL6K+E5YiG5qCH5YeGXHJcbiAqIEBwYXJhbSBjb3Vyc2VGSURcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW1hcmtTdGFuZGFyZChjb3Vyc2VGSUQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlTWFuYWdlL0dldExpc3RDb3Vyc2VSZWZsZWN0Q29uZmlnRGV0YWlscycsIHtcclxuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VGSURcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5Lya5a6J5o6S5q2l6aqk5YiX6KGoXHJcbiAqIEBwYXJhbSBjb3Vyc2VGSURcclxuICogQHBhcmFtIGdyb3VwRklEXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q291cnNlQXJyYW5nZUxpc3QoY291cnNlRklELCBncm91cEZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRMaXN0Q291cnNlR3JvdXBBcnJhbmdlSW5mbycsIHtcclxuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VGSUQsXHJcbiAgICAgICAgICAgIGdyb3VwRklEOiBncm91cEZJRFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxyXG4gICAgICAgIH0sIHJlamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKDpmaTkvJrlronmjpLmn5DkuIDmraXpqqRcclxuICogQHBhcmFtIGFycmFuZ2VJZFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUFycmFuZ2UoYXJyYW5nZUlkKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9EZWxldGVDb3Vyc2VBcnJhbmdlSW5mbycsIHtcclxuICAgICAgICAgICAgRkxua0lEOiBhcnJhbmdlSWRcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5L+d5a2Y5Lya5a6J5o6S5L+u5pS5XHJcbiAqIEBwYXJhbSBkYXRhICAgU3RlcExpc3RcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlR3JvdXBBcnJhbmdlTGlzdChkYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9TYXZlQ291cnNlQXJyYW5nZUluZm8nLCBkYXRhKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi35Lya5Y+N5oCd5YaF5a65XHJcbiAqIEBwYXJhbSB1c2VyRklEXHJcbiAqIEBwYXJhbSBncm91cEZJRFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoaW5rQ29udGVudCh1c2VyRklELCBncm91cEZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRDcm91c2VHcm91cFJlZmxlY3RJbmZvJywge1xyXG4gICAgICAgICAgICB1c2VyRklEOiB1c2VyRklELFxyXG4gICAgICAgICAgICBncm91cEZJRDogZ3JvdXBGSURcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgIH0sIHJlamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDkv53lrZjnlKjmiLfkvJrlj43mgJ3lhoXlrrlcclxuICogQHBhcmFtIGRhdGFcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlVGhpbmtDb250ZW50KGRhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL1NhdmVDcm91c2VHcm91cFJlZmxlY3RJbmZvJywge1xyXG4gICAgICAgICAgICBGbG5rSUQ6IGRhdGEuRmxua0lEIHx8ICcnLFxyXG4gICAgICAgICAgICBTdHVkZW50RklEOiBkYXRhLlN0dWRlbnRGSUQsXHJcbiAgICAgICAgICAgIFN0dWRlbnROYW1lOiBkYXRhLlN0dWRlbnROYW1lLFxyXG4gICAgICAgICAgICBSZWZsZWN0Q29udGVudDogZGF0YS5SZWZsZWN0Q29udGVudCxcclxuICAgICAgICAgICAgR3JvdXBGSUQ6IGRhdGEuR3JvdXBGSUQsXHJcbiAgICAgICAgICAgIENvdXJzZUZJRDogZGF0YS5Db3Vyc2VGSURcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W55So5oi35o+Q5Lqk55qE5q2l6aqk5piO57uGXHJcbiAqIEBwYXJhbSB1c2VyRklEXHJcbiAqIEBwYXJhbSBncm91cEZJRFxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJTdWJtaXRTdGVwcyh1c2VyRklELCBncm91cEZJRCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRDb3Vyc2VHcm91cFdvcmtBcnJhbmdlSW5mb0J5U3R1ZGVudCcsIHtcclxuICAgICAgICAgICAgdXNlckZJRDogdXNlckZJRCxcclxuICAgICAgICAgICAgZ3JvdXBGSUQ6IGdyb3VwRklEXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgcmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOS4iuS8oOWbvueJhy/pn7PpopEv6KeG6aKR562J6LWE5rqQXHJcbiAqIEBwYXJhbSBmaWxlUGF0aFxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWRGaWxlKGZpbGVQYXRoLCBwYXJhbSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS51cGxvYWRGaWxlKCdhcGkvRmlsZS9VcGxvYWRNZXNzYWdlRmlsZScsIGZpbGVQYXRoLCBwYXJhbSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5YiG6aG16I635Y+W6IGK5aSp6K6w5b2VXHJcbiAqIEBwYXJhbSBHcm91cEZJRFxyXG4gKiBAcGFyYW0gVXNlckZJRFxyXG4gKiBAcGFyYW0gcGFnZUluZGV4XHJcbiAqIEBwYXJhbSBSb2xlTnVtXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhdE1zZ0J5UGFnZShHcm91cEZJRCwgVXNlckZJRCwgUm9sZU51bSwgcGFnZUluZGV4KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9HZXRQYWdlQ2hhdE1lc3NhZ2UnLCB7XHJcbiAgICAgICAgICAgIEdyb3VwRklEOiBHcm91cEZJRCxcclxuICAgICAgICAgICAgVXNlckZJRDogVXNlckZJRCB8fCBudWxsLFxyXG4gICAgICAgICAgICBSb2xlTnVtOiBSb2xlTnVtIHx8IG51bGwsXHJcbiAgICAgICAgICAgIFBhZ2U6IHtcclxuICAgICAgICAgICAgICAgIFBhZ2VJbmRleDogcGFnZUluZGV4IHx8IDEsXHJcbiAgICAgICAgICAgICAgICBQYWdlU2l6ZTogY29uZmlnLmNoYXRNc2dQYWdlU2l6ZSB8fCAyMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge2lnbm9yZUxvYWRpbmc6IHRydWV9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcclxuICAgICAgICB9LCByZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog5Yig6Zmk6IGK5aSp5raI5oGvXHJcbiAqIEBwYXJhbSBNZXNzYWdlRklEXHJcbiAqIEBwYXJhbSBVc2VyRklEXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQ2hhdE1zZyhNZXNzYWdlRklELCBVc2VyRklEKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9EZWxldGVDaGF0TWVzc2FnZScsIHtcclxuICAgICAgICAgICAgTWVzc2FnZUZJRDogTWVzc2FnZUZJRCxcclxuICAgICAgICAgICAgVXNlckZJRDogVXNlckZJRFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxyXG4gICAgICAgIH0sIHJlamVjdClcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5blsI/nu4TogIHluIjor4TliIbor6bmg4VcclxuICogQHBhcmFtIGdyb3VwRklEXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVhY2hlclJlbWFya0J5R3JvdXAoZ3JvdXBGSUQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlR3JvdXAvR2V0TGlzdENyb3VzZUdyb3VwUmVmbGVjdFNjb3JlVmlldycsIHtcclxuICAgICAgICAgICAgZ3JvdXBGSUQ6IGdyb3VwRklEXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6Kej6Zmk57uR5a6aXHJcbiAqIEBwYXJhbSB1c2VySWRcclxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxCaW5kKHVzZXJJZCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvVXNlckJhc2VJbmZvL0NhbmNsZUJpbmRXZUNoYXQnLCB7XHJcbiAgICAgICAgICAgIEZMbmtJRDogdXNlcklkXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICog6I635Y+W5bCP57uE5omA5pyJ5oiQ5ZGYXHJcbiAqIEBwYXJhbSBncm91cElkXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JvdXBNZW1iZXJzKGdyb3VwSWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlR3JvdXAvR2V0TGlzdEdyb3VwTWVtYmVyc0J5R3JvdXAnLCB7XHJcbiAgICAgICAgICAgIGdyb3VwRklEOiBncm91cElkXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXHJcbiAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbiJdfQ==