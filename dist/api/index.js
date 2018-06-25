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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImxvZ2luIiwidXNlclJlZ2lzdGVyIiwiZ2V0Q291cnNlQ2F0ZUJ5U2Nob29sIiwiZ2V0Q291cnNlc0J5Q2F0ZWdvcnkiLCJnZXRDb3Vyc2VEZXRhaWxCeUlkIiwiZ2V0U3VjY2Vzc1Rhc2tzQnlDb3Vyc2VJZCIsImdldENsYXNzbWF0ZUxpc3QiLCJpc1N0dUluQ291cnNlR3JvdXAiLCJjcmVhdGVDb3Vyc2VHcm91cCIsImdldFN0dURldGFpbEluZm8iLCJnZXRDb3Vyc2VUYXNrT3JkZXJMaXN0IiwidXNlclByYWlzZSIsInVzZXJDYW5jZWxQcmFpc2UiLCJnZXRNeUNvdXJzZVRhc2tzIiwiYWN0aXZhdGVHcm91cFRhc2siLCJnZXRQcmV2S25vd0J5Q291cnNlIiwiZ2V0Q3VycmVudEFjdGl2YXRlVGFzayIsImdldEdyb3VwRGV0YWlsIiwiZ2V0UmVtYXJrU3RhbmRhcmQiLCJnZXRDb3Vyc2VBcnJhbmdlTGlzdCIsImRlbGV0ZUFycmFuZ2UiLCJzYXZlR3JvdXBBcnJhbmdlTGlzdCIsImdldFRoaW5rQ29udGVudCIsInNhdmVUaGlua0NvbnRlbnQiLCJnZXRVc2VyU3VibWl0U3RlcHMiLCJ1cGxvYWRGaWxlIiwiZ2V0Q2hhdE1zZ0J5UGFnZSIsImRlbGV0ZUNoYXRNc2ciLCJnZXRUZWFjaGVyUmVtYXJrQnlHcm91cCIsImNhbmNlbEJpbmQiLCJnZXRHcm91cE1lbWJlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsImh0dHBTZXJ2aWNlIiwiZ2V0IiwidGhlbiIsIlJlc3VsdE9iaiIsImZhaWwiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkYXRhIiwicG9zdCIsIk9wZW5JZCIsIm9wZW5pZCIsIlNGWkgiLCJYTSIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwiZ2VuZGVyIiwiY2l0eSIsInByb3ZpbmNlIiwiQ291bnRyeSIsIlVuaW9uSWQiLCJzY2hvb2xJZCIsInNjaG9vbEZJRCIsImNhdGVnb3J5SWQiLCJTY2hvb2xGSUQiLCJDb3Vyc2VUeXBlIiwiSXNBdWRpdGVkIiwiSXNPcGVuIiwiUGFnZSIsIlBhZ2VJbmRleCIsIlBhZ2VTaXplIiwiRmxhZyIsIkRhdGFTb3VyY2UiLCJjb3Vyc2VJZCIsImNvdXJzZUZJRCIsInN0dWRlbnRGSUQiLCJncm91cEZJRCIsInN0dUxpc3QiLCJzdHVEZXRhaWwiLCJmaW5kIiwiaXRlbSIsIlN0dWRlbnRGSUQiLCJpc0luIiwiR3JvdXBGSUQiLCJ1c2VyRklEIiwiVXNlckZJRCIsIkxldmVsTnVtIiwiR3JhZGVOdW0iLCJDbGFzc051bSIsInN0dUZJRCIsIkNvdXJzZUZJRCIsImFycmFuZ2VJZCIsIkZMbmtJRCIsIkZsbmtJRCIsIlN0dWRlbnROYW1lIiwiUmVmbGVjdENvbnRlbnQiLCJmaWxlUGF0aCIsInBhcmFtIiwiY29uc29sZSIsImxvZyIsIlJvbGVOdW0iLCJwYWdlSW5kZXgiLCJjb25maWciLCJjaGF0TXNnUGFnZVNpemUiLCJpZ25vcmVMb2FkaW5nIiwiTWVzc2FnZUZJRCIsInVzZXJJZCIsImdyb3VwSWQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBUWdCQSxLLEdBQUFBLEs7UUE0QkFDLFksR0FBQUEsWTtRQXdCQUMscUIsR0FBQUEscUI7UUFZQUMsb0IsR0FBQUEsb0I7UUEwQkFDLG1CLEdBQUFBLG1CO1FBZUFDLHlCLEdBQUFBLHlCO1FBZ0JBQyxnQixHQUFBQSxnQjtRQWlCQUMsa0IsR0FBQUEsa0I7UUFrQ0FDLGlCLEdBQUFBLGlCO1FBYUFDLGdCLEdBQUFBLGdCO1FBbUJBQyxzQixHQUFBQSxzQjtRQXVCQUMsVSxHQUFBQSxVO1FBaUJBQyxnQixHQUFBQSxnQjtRQWdCQUMsZ0IsR0FBQUEsZ0I7UUFzQkFDLGlCLEdBQUFBLGlCO1FBaUJBQyxtQixHQUFBQSxtQjtRQWVBQyxzQixHQUFBQSxzQjtRQWVBQyxjLEdBQUFBLGM7UUFlQUMsaUIsR0FBQUEsaUI7UUFnQkFDLG9CLEdBQUFBLG9CO1FBZ0JBQyxh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T0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0ssOEJBQVlDLEdBQVosQ0FBZ0IsNENBQWhCLEVBQThEO0FBQzFEbUMsc0JBQVUrQjtBQURnRCxTQUE5RCxFQUVHakUsSUFGSCxDQUVRLGVBQU87QUFDWFIsb0JBQVFJLElBQUlLLFNBQVo7QUFDSCxTQUpELEVBSUcsVUFBQ0wsR0FBRCxFQUFTO0FBQ1JILG1CQUFPRyxHQUFQO0FBQ0gsU0FORDtBQU9ILEtBUk0sQ0FBUDtBQVNIIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBodHRwU2VydmljZSBmcm9tICcuLi91dGlsL2h0dHBTZXJ2aWNlJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbi8qKlxuICog55m76ZmG5o6l5Y+jXG4gKiDliY3nq6/lhYjosIPnlKjlvq7kv6HlsI/nqIvluo/nmbvpmYbmjqXlj6PvvIzojrflj5Zjb2Rl77yM5YaN6YCa6L+HY29kZeWunueOsOacjeWKoeWZqOeZu+mZhlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9naW4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd2VweS5sb2dpbih7XG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Vc2VyQmFzZUluZm8vVXNlckJpbmRXZUNoYXRCeUNvZGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgICAgICAgICAgICAgIH0sIHJlamVjdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbChyZXMpIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55m76ZmG5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbi8qKlxuICog55So5oi357uR5a6a5rOo5YaM5o6l5Y+jXG4gKiBAcGFyYW0gZGF0YVxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VyUmVnaXN0ZXIoZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Vc2VyQmFzZUluZm8vVXNlckJpbmRXZUNoYXRTbWFsbFByb2dyYW0nLCB7XG4gICAgICAgICAgICBPcGVuSWQ6IGRhdGEub3BlbmlkLFxuICAgICAgICAgICAgU0ZaSDogZGF0YS5TRlpILFxuICAgICAgICAgICAgWE06IGRhdGEuWE0sXG4gICAgICAgICAgICBuaWNrTmFtZTogZGF0YS5uaWNrTmFtZSxcbiAgICAgICAgICAgIGF2YXRhclVybDogZGF0YS5hdmF0YXJVcmwsXG4gICAgICAgICAgICBnZW5kZXI6IGRhdGEuZ2VuZGVyLFxuICAgICAgICAgICAgY2l0eTogJycsXG4gICAgICAgICAgICBwcm92aW5jZTogJycsXG4gICAgICAgICAgICBDb3VudHJ5OiAnJyxcbiAgICAgICAgICAgIFVuaW9uSWQ6ICcnXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcbiAgICAgICAgfSwgcmVqZWN0KVxuICAgIH0pXG59XG5cbi8qKlxuICog5qC55o2u5a2m5qCh6I635Y+W6K++56iL57G75YirXG4gKiBAcGFyYW0gc2Nob29sSWRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q291cnNlQ2F0ZUJ5U2Nob29sKHNjaG9vbElkKSB7XG4gICAgcmV0dXJuIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUluZm8vR2V0Q291cnNlQ2F0ZWdvcnlWaWV3QnlTY2hvb2wnLCB7XG4gICAgICAgIHNjaG9vbEZJRDogc2Nob29sSWRcbiAgICB9KVxufVxuXG4vKipcbiAqIOagueaNruivvueoi+exu+WIq+iOt+WPluivvueoi+WIl+ihqFxuICogQHBhcmFtIGNhdGVnb3J5SWRcbiAqIEBwYXJhbSBzY2hvb2xGSURcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3Vyc2VzQnlDYXRlZ29yeShjYXRlZ29yeUlkLCBzY2hvb2xGSUQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlSW5mby9HZXRQYWdlTGlzdENvdXJzZUluZm8nLCB7XG4gICAgICAgICAgICBTY2hvb2xGSUQ6IHNjaG9vbEZJRCxcbiAgICAgICAgICAgIENvdXJzZVR5cGU6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBJc0F1ZGl0ZWQ6IHRydWUsXG4gICAgICAgICAgICBJc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgUGFnZToge1xuICAgICAgICAgICAgICAgIFBhZ2VJbmRleDogMSxcbiAgICAgICAgICAgICAgICBQYWdlU2l6ZTogOTk5OVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLkZsYWcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmouRGF0YVNvdXJjZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgcmVqZWN0KVxuICAgIH0pXG59XG5cbi8qKlxuICog5qC55o2u6K++56iLaWTojrflj5bor77nqIvor6bmg4VcbiAqIEBwYXJhbSBjb3Vyc2VJZFxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvdXJzZURldGFpbEJ5SWQoY291cnNlSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VJbmZvL0dldENvdXJzZUluZm9EZXRhaWxzJywge1xuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VJZFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOagueaNruivvueoi2lk6I635Y+W5a6M5oiQ6K++56iL55qE5Lu75Yqh5YiX6KGoXG4gKiBAcGFyYW0gY291cnNlSWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWNjZXNzVGFza3NCeUNvdXJzZUlkKGNvdXJzZUlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlR3JvdXAvR2V0Q291cnNlR3JvdXBDb21wbGV0ZUJ5Q291cnNlSUQnLCB7XG4gICAgICAgICAgICBjb3Vyc2VGSUQ6IGNvdXJzZUlkXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcbiAgICAgICAgfSwgcmVqZWN0KVxuICAgIH0pXG59XG5cbi8qKlxuICog5qC55o2u5a2m55SfaWTlkozor77nqItpZOiOt+WPluWQjOWtpuWIl+ihqFxuICogQHBhcmFtIHN0dWRlbnRGSURcbiAqIEBwYXJhbSBjb3Vyc2VGSURcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFzc21hdGVMaXN0KHN0dWRlbnRGSUQsIGNvdXJzZUZJRCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldEdyb3VwU2VsZWN0TWVtYmVyc1ZpZXdCeVN0dWRlbnRDb3Vyc2UnLCB7XG4gICAgICAgICAgICBzdHVkZW50RklEOiBzdHVkZW50RklELFxuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDmo4Dmn6XlrabnlJ/mmK/lkKblt7Lnu4/liqDlhaXor6Xor77nqIvnmoTmn5DkuKrlsI/nu4RcbiAqIEBwYXJhbSBzdHVkZW50RklEXG4gKiBAcGFyYW0gY291cnNlRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHVJbkNvdXJzZUdyb3VwKHN0dWRlbnRGSUQsIGNvdXJzZUZJRCwgZ3JvdXBGSUQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRHcm91cFNlbGVjdE1lbWJlcnNWaWV3QnlTdHVkZW50Q291cnNlJywge1xuICAgICAgICAgICAgc3R1ZGVudEZJRDogc3R1ZGVudEZJRCxcbiAgICAgICAgICAgIGNvdXJzZUZJRDogY291cnNlRklEXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBzdHVMaXN0ID0gcmVzLlJlc3VsdE9ialxuICAgICAgICAgICAgbGV0IHN0dURldGFpbCA9IHN0dUxpc3QuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5TdHVkZW50RklEID09PSBzdHVkZW50RklEXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IGlzSW5cbiAgICAgICAgICAgIGlmIChzdHVEZXRhaWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3R1RGV0YWlsLkdyb3VwRklEKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cEZJRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNJbiA9IHN0dURldGFpbC5Hcm91cEZJRCA9PT0gZ3JvdXBGSURcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSW4gPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc0luID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlzSW4gPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZSghIWlzSW4pXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOagueaNruivvueoi+WIm+W7uuWwj+e7hFxuICogQHBhcmFtIGRhdGFcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VHcm91cChkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL0NyZWF0ZUNvdXJzZUdyb3VwJywgZGF0YSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOiOt+WPluWtpueUn+ivpue7huS/oeaBr1xuICogQHBhcmFtIHVzZXJGSURcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHVEZXRhaWxJbmZvKHVzZXJGSUQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Vc2VyQmFzZUluZm8vR2V0U2lnblN0dWRlbnRJbmZvVmlldycsIHtcbiAgICAgICAgICAgIHVzZXJGSUQ6IHVzZXJGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDojrflj5bpppbpobXlrabmoKEv54+t57qn5Lu75Yqh5a6M5oiQ5oOF5Ya15o6S6KGM5qac5Y2VXG4gKiBAcGFyYW0gc2Nob29sRklEXG4gKiBAcGFyYW0gVXNlckZJRFxuICogQHBhcmFtIExldmVsTnVtXG4gKiBAcGFyYW0gR3JhZGVOdW1cbiAqIEBwYXJhbSBDbGFzc051bVxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvdXJzZVRhc2tPcmRlckxpc3Qoc2Nob29sRklELCBVc2VyRklELCBMZXZlbE51bSwgR3JhZGVOdW0sIENsYXNzTnVtKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL0dldFBhZ2VMaXN0Q291cnNlR3JvdXBJbmZvJywge1xuICAgICAgICAgICAgJ1NjaG9vbEZJRCc6IHNjaG9vbEZJRCxcbiAgICAgICAgICAgICdMZXZlbE51bSc6IExldmVsTnVtIHx8ICcnLFxuICAgICAgICAgICAgJ0dyYWRlTnVtJzogR3JhZGVOdW0gfHwgJycsXG4gICAgICAgICAgICAnQ2xhc3NOdW0nOiBDbGFzc051bSB8fCAnJyxcbiAgICAgICAgICAgICdVc2VyRklEJzogVXNlckZJRCB8fCAnJyxcbiAgICAgICAgICAgICdQYWdlJzoge1xuICAgICAgICAgICAgICAgICdQYWdlSW5kZXgnOiAxLFxuICAgICAgICAgICAgICAgICdQYWdlU2l6ZSc6IDk5OTlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihyZXNvbHZlLCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDngrnlh7vku7vliqHlsI/nu4RcbiAqIEBwYXJhbSBzdHVGSURcbiAqIEBwYXJhbSBncm91cEZJRFxuICogQHBhcmFtIGNvdXJzZUZJRFxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZXJQcmFpc2Uoc3R1RklELCBncm91cEZJRCwgY291cnNlRklEKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL1VzZXJQcmFpc2UnLCB7XG4gICAgICAgICAgICAnc3R1ZGVudEZJRCc6IHN0dUZJRCxcbiAgICAgICAgICAgICdncm91cEZJRCc6IGdyb3VwRklELFxuICAgICAgICAgICAgJ0NvdXJzZUZJRCc6IGNvdXJzZUZJRFxuICAgICAgICB9KS50aGVuKHJlc29sdmUsIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOWPlua2iOeCuei1nuS7u+WKoeWwj+e7hFxuICogQHBhcmFtIHN0dUZJRFxuICogQHBhcmFtIGdyb3VwRklEXG4gKiBAcGFyYW0gY291cnNlRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlckNhbmNlbFByYWlzZShzdHVGSUQsIGdyb3VwRklELCBjb3Vyc2VGSUQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlR3JvdXAvVXNlckNhbmNsZVByYWlzZScsIHtcbiAgICAgICAgICAgICdzdHVkZW50RklEJzogc3R1RklELFxuICAgICAgICAgICAgJ2dyb3VwRklEJzogZ3JvdXBGSUQsXG4gICAgICAgICAgICAnQ291cnNlRklEJzogY291cnNlRklEXG4gICAgICAgIH0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pXG59XG5cbi8qKlxuICog6I635Y+W5Liq5Lq65Y+C5LiO55qE6K++56iL5Lu75YqhXG4gKiBAcGFyYW0gc2Nob29sRklEXG4gKiBAcGFyYW0gdXNlckZJRFxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE15Q291cnNlVGFza3Moc2Nob29sRklELCB1c2VyRklEKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL0dldFBhZ2VMaXN0Q291cnNlR3JvdXBCeVVzZXInLCB7XG4gICAgICAgICAgICAnU2Nob29sRklEJzogc2Nob29sRklELFxuICAgICAgICAgICAgJ1VzZXJGSUQnOiB1c2VyRklELFxuICAgICAgICAgICAgJ1BhZ2UnOiB7XG4gICAgICAgICAgICAgICAgJ1BhZ2VJbmRleCc6IDEsXG4gICAgICAgICAgICAgICAgJ1BhZ2VTaXplJzogOTk5OVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmouRGF0YVNvdXJjZSB8fCBbXSlcbiAgICAgICAgfSwgcmVqZWN0KVxuICAgIH0pXG59XG5cbi8qKlxuICog5r+A5rS75Lu75YqhXG4gKiBAcGFyYW0gc3R1ZGVudEZJRFxuICogQHBhcmFtIGdyb3VwRklEXG4gKiBAcGFyYW0gY291cnNlRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGVHcm91cFRhc2soc3R1ZGVudEZJRCwgZ3JvdXBGSUQsIGNvdXJzZUZJRCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9Vc2VBY3RpdmF0aW9uR3JvdXAnLCB7XG4gICAgICAgICAgICBzdHVkZW50RklEOiBzdHVkZW50RklELFxuICAgICAgICAgICAgZ3JvdXBGSUQ6IGdyb3VwRklELFxuICAgICAgICAgICAgQ291cnNlRklEOiBjb3Vyc2VGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDmoLnmja7or77nqItpZOiOt+WPluaXqeefpemBk+WGheWuuVxuICogQHBhcmFtIGNvdXJzZUlkXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldktub3dCeUNvdXJzZShjb3Vyc2VJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZU1hbmFnZS9HZXRTaW5nbGVDb3Vyc2VLbm93cycsIHtcbiAgICAgICAgICAgIGNvdXJzZUZJRDogY291cnNlSWRcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDojrflj5bnlKjmiLflvZPliY3mv4DmtLvnmoTku7vliqFcbiAqIEBwYXJhbSB1c2VyRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudEFjdGl2YXRlVGFzayh1c2VyRklEKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlR3JvdXAvR2V0Q3VycnlBY3RpdmF0aW9uJywge1xuICAgICAgICAgICAgdXNlckZJRDogdXNlckZJRFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOiOt+WPluWwj+e7hOS7u+WKoeivpuaDhVxuICogQHBhcmFtIGdyb3VwRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JvdXBEZXRhaWwoZ3JvdXBGSUQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRTaW5nbGVDb3Vyc2VHcm91cCcsIHtcbiAgICAgICAgICAgIGdyb3VwRklEOiBncm91cEZJRFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOiOt+WPluivvueoi+ivhOWIhuagh+WHhlxuICogQHBhcmFtIGNvdXJzZUZJRFxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbWFya1N0YW5kYXJkKGNvdXJzZUZJRCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZU1hbmFnZS9HZXRMaXN0Q291cnNlUmVmbGVjdENvbmZpZ0RldGFpbHMnLCB7XG4gICAgICAgICAgICBjb3Vyc2VGSUQ6IGNvdXJzZUZJRFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOiOt+WPluS8muWuieaOkuatpemqpOWIl+ihqFxuICogQHBhcmFtIGNvdXJzZUZJRFxuICogQHBhcmFtIGdyb3VwRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q291cnNlQXJyYW5nZUxpc3QoY291cnNlRklELCBncm91cEZJRCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldExpc3RDb3Vyc2VHcm91cEFycmFuZ2VJbmZvJywge1xuICAgICAgICAgICAgY291cnNlRklEOiBjb3Vyc2VGSUQsXG4gICAgICAgICAgICBncm91cEZJRDogZ3JvdXBGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDliKDpmaTkvJrlronmjpLmn5DkuIDmraXpqqRcbiAqIEBwYXJhbSBhcnJhbmdlSWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBcnJhbmdlKGFycmFuZ2VJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9EZWxldGVDb3Vyc2VBcnJhbmdlSW5mbycsIHtcbiAgICAgICAgICAgIEZMbmtJRDogYXJyYW5nZUlkXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcbiAgICAgICAgfSwgcmVqZWN0KVxuICAgIH0pXG59XG5cbi8qKlxuICog5L+d5a2Y5Lya5a6J5o6S5L+u5pS5XG4gKiBAcGFyYW0gZGF0YSAgIFN0ZXBMaXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUdyb3VwQXJyYW5nZUxpc3QoZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Db3Vyc2VHcm91cC9TYXZlQ291cnNlQXJyYW5nZUluZm8nLCBkYXRhKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOiOt+WPlueUqOaIt+S8muWPjeaAneWGheWuuVxuICogQHBhcmFtIHVzZXJGSURcbiAqIEBwYXJhbSBncm91cEZJRFxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRoaW5rQ29udGVudCh1c2VyRklELCBncm91cEZJRCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldENyb3VzZUdyb3VwUmVmbGVjdEluZm8nLCB7XG4gICAgICAgICAgICB1c2VyRklEOiB1c2VyRklELFxuICAgICAgICAgICAgZ3JvdXBGSUQ6IGdyb3VwRklEXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDkv53lrZjnlKjmiLfkvJrlj43mgJ3lhoXlrrlcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVRoaW5rQ29udGVudChkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL1NhdmVDcm91c2VHcm91cFJlZmxlY3RJbmZvJywge1xuICAgICAgICAgICAgRmxua0lEOiBkYXRhLkZsbmtJRCB8fCAnJyxcbiAgICAgICAgICAgIFN0dWRlbnRGSUQ6IGRhdGEuU3R1ZGVudEZJRCxcbiAgICAgICAgICAgIFN0dWRlbnROYW1lOiBkYXRhLlN0dWRlbnROYW1lLFxuICAgICAgICAgICAgUmVmbGVjdENvbnRlbnQ6IGRhdGEuUmVmbGVjdENvbnRlbnQsXG4gICAgICAgICAgICBHcm91cEZJRDogZGF0YS5Hcm91cEZJRCxcbiAgICAgICAgICAgIENvdXJzZUZJRDogZGF0YS5Db3Vyc2VGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDojrflj5bnlKjmiLfmj5DkuqTnmoTmraXpqqTmmI7nu4ZcbiAqIEBwYXJhbSB1c2VyRklEXG4gKiBAcGFyYW0gZ3JvdXBGSURcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyU3VibWl0U3RlcHModXNlckZJRCwgZ3JvdXBGSUQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5nZXQoJ2FwaS9Db3Vyc2VHcm91cC9HZXRDb3Vyc2VHcm91cFdvcmtBcnJhbmdlSW5mb0J5U3R1ZGVudCcsIHtcbiAgICAgICAgICAgIHVzZXJGSUQ6IHVzZXJGSUQsXG4gICAgICAgICAgICBncm91cEZJRDogZ3JvdXBGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDkuIrkvKDlm77niYcv6Z+z6aKRL+inhumikeetiei1hOa6kFxuICogQHBhcmFtIGZpbGVQYXRoXG4gKiBAcGFyYW0gcGFyYW1cbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWRGaWxlKGZpbGVQYXRoLCBwYXJhbSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLnVwbG9hZEZpbGUoJ2FwaS9GaWxlL1VwbG9hZE1lc3NhZ2VGaWxlJywgZmlsZVBhdGgsIHBhcmFtKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOWIhumhteiOt+WPluiBiuWkqeiusOW9lVxuICogQHBhcmFtIEdyb3VwRklEXG4gKiBAcGFyYW0gVXNlckZJRFxuICogQHBhcmFtIHBhZ2VJbmRleFxuICogQHBhcmFtIFJvbGVOdW1cbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGF0TXNnQnlQYWdlKEdyb3VwRklELCBVc2VyRklELCBSb2xlTnVtLCBwYWdlSW5kZXgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBodHRwU2VydmljZS5wb3N0KCdhcGkvQ291cnNlR3JvdXAvR2V0UGFnZUNoYXRNZXNzYWdlJywge1xuICAgICAgICAgICAgR3JvdXBGSUQ6IEdyb3VwRklELFxuICAgICAgICAgICAgVXNlckZJRDogVXNlckZJRCB8fCBudWxsLFxuICAgICAgICAgICAgUm9sZU51bTogUm9sZU51bSB8fCBudWxsLFxuICAgICAgICAgICAgUGFnZToge1xuICAgICAgICAgICAgICAgIFBhZ2VJbmRleDogcGFnZUluZGV4IHx8IDEsXG4gICAgICAgICAgICAgICAgUGFnZVNpemU6IGNvbmZpZy5jaGF0TXNnUGFnZVNpemUgfHwgMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge2lnbm9yZUxvYWRpbmc6IHRydWV9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIHJlamVjdClcbiAgICB9KVxufVxuXG4vKipcbiAqIOWIoOmZpOiBiuWkqea2iOaBr1xuICogQHBhcmFtIE1lc3NhZ2VGSURcbiAqIEBwYXJhbSBVc2VyRklEXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQ2hhdE1zZyhNZXNzYWdlRklELCBVc2VyRklEKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UucG9zdCgnYXBpL0NvdXJzZUdyb3VwL0RlbGV0ZUNoYXRNZXNzYWdlJywge1xuICAgICAgICAgICAgTWVzc2FnZUZJRDogTWVzc2FnZUZJRCxcbiAgICAgICAgICAgIFVzZXJGSUQ6IFVzZXJGSURcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCByZWplY3QpXG4gICAgfSlcbn1cblxuLyoqXG4gKiDojrflj5blsI/nu4TogIHluIjor4TliIbor6bmg4VcbiAqIEBwYXJhbSBncm91cEZJRFxuICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRlYWNoZXJSZW1hcmtCeUdyb3VwKGdyb3VwRklEKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaHR0cFNlcnZpY2UuZ2V0KCdhcGkvQ291cnNlR3JvdXAvR2V0TGlzdENyb3VzZUdyb3VwUmVmbGVjdFNjb3JlVmlldycsIHtcbiAgICAgICAgICAgIGdyb3VwRklEOiBncm91cEZJRFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5SZXN1bHRPYmopXG4gICAgICAgIH0sIChyZXMpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuLyoqXG4gKiDop6PpmaTnu5HlrppcbiAqIEBwYXJhbSB1c2VySWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxCaW5kKHVzZXJJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLnBvc3QoJ2FwaS9Vc2VyQmFzZUluZm8vQ2FuY2xlQmluZFdlQ2hhdCcsIHtcbiAgICAgICAgICAgIEZMbmtJRDogdXNlcklkXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLlJlc3VsdE9iailcbiAgICAgICAgfSwgKHJlcykgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG4vKipcbiAqIOiOt+WPluWwj+e7hOaJgOacieaIkOWRmFxuICogQHBhcmFtIGdyb3VwSWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHcm91cE1lbWJlcnMoZ3JvdXBJZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGh0dHBTZXJ2aWNlLmdldCgnYXBpL0NvdXJzZUdyb3VwL0dldExpc3RHcm91cE1lbWJlcnNCeUdyb3VwJywge1xuICAgICAgICAgICAgZ3JvdXBGSUQ6IGdyb3VwSWRcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuUmVzdWx0T2JqKVxuICAgICAgICB9LCAocmVzKSA9PiB7XG4gICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICB9KVxuICAgIH0pXG59XG4iXX0=