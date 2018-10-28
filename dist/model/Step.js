'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Step = exports.Step = function Step(data) {
    _classCallCheck(this, Step);

    this.ArrangeName = data.ArrangeName;
    this.CourseFID = data.CourseFID;
    this.GroupFID = data.GroupFID;
    this.FileCount = data.FileCount || 0;
    this.ArrangeType = data.ArrangeType || 0;
    this.Creater = data.Creater;
    this.Modifier = data.Creater;
    this.SortCode = data.SortCode;
    this.modelList = [{
        FlnkID: '',
        CourseFID: data.CourseFID,
        GroupFID: data.GroupFID,
        ArrangeFID: '',
        ArrangeType: data.ArrangeType || 0,
        ArrangeContent: data.ArrangeContent,
        Creater: data.Creater,
        Modifier: data.Creater,
        SortCode: 1
    }];
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0ZXAuanMiXSwibmFtZXMiOlsiU3RlcCIsImRhdGEiLCJBcnJhbmdlTmFtZSIsIkNvdXJzZUZJRCIsIkdyb3VwRklEIiwiRmlsZUNvdW50IiwiQXJyYW5nZVR5cGUiLCJDcmVhdGVyIiwiTW9kaWZpZXIiLCJTb3J0Q29kZSIsIm1vZGVsTGlzdCIsIkZsbmtJRCIsIkFycmFuZ2VGSUQiLCJBcnJhbmdlQ29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBYUEsSSxXQUFBQSxJLEdBQ1QsY0FBYUMsSUFBYixFQUFtQjtBQUFBOztBQUNmLFNBQUtDLFdBQUwsR0FBbUJELEtBQUtDLFdBQXhCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkYsS0FBS0UsU0FBdEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxLQUFLRyxRQUFyQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJKLEtBQUtJLFNBQUwsSUFBa0IsQ0FBbkM7QUFDQSxTQUFLQyxXQUFMLEdBQW1CTCxLQUFLSyxXQUFMLElBQW9CLENBQXZDO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTixLQUFLTSxPQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JQLEtBQUtNLE9BQXJCO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQlIsS0FBS1EsUUFBckI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQUM7QUFDZEMsZ0JBQVEsRUFETTtBQUVkUixtQkFBV0YsS0FBS0UsU0FGRjtBQUdkQyxrQkFBVUgsS0FBS0csUUFIRDtBQUlkUSxvQkFBWSxFQUpFO0FBS2ROLHFCQUFhTCxLQUFLSyxXQUFMLElBQW9CLENBTG5CO0FBTWRPLHdCQUFnQlosS0FBS1ksY0FOUDtBQU9kTixpQkFBU04sS0FBS00sT0FQQTtBQVFkQyxrQkFBVVAsS0FBS00sT0FSRDtBQVNkRSxrQkFBVTtBQVRJLEtBQUQsQ0FBakI7QUFXSCxDIiwiZmlsZSI6IlN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RlcCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuQXJyYW5nZU5hbWUgPSBkYXRhLkFycmFuZ2VOYW1lXHJcbiAgICAgICAgdGhpcy5Db3Vyc2VGSUQgPSBkYXRhLkNvdXJzZUZJRFxyXG4gICAgICAgIHRoaXMuR3JvdXBGSUQgPSBkYXRhLkdyb3VwRklEXHJcbiAgICAgICAgdGhpcy5GaWxlQ291bnQgPSBkYXRhLkZpbGVDb3VudCB8fCAwXHJcbiAgICAgICAgdGhpcy5BcnJhbmdlVHlwZSA9IGRhdGEuQXJyYW5nZVR5cGUgfHwgMFxyXG4gICAgICAgIHRoaXMuQ3JlYXRlciA9IGRhdGEuQ3JlYXRlclxyXG4gICAgICAgIHRoaXMuTW9kaWZpZXIgPSBkYXRhLkNyZWF0ZXJcclxuICAgICAgICB0aGlzLlNvcnRDb2RlID0gZGF0YS5Tb3J0Q29kZVxyXG4gICAgICAgIHRoaXMubW9kZWxMaXN0ID0gW3tcclxuICAgICAgICAgICAgRmxua0lEOiAnJyxcclxuICAgICAgICAgICAgQ291cnNlRklEOiBkYXRhLkNvdXJzZUZJRCxcclxuICAgICAgICAgICAgR3JvdXBGSUQ6IGRhdGEuR3JvdXBGSUQsXHJcbiAgICAgICAgICAgIEFycmFuZ2VGSUQ6ICcnLFxyXG4gICAgICAgICAgICBBcnJhbmdlVHlwZTogZGF0YS5BcnJhbmdlVHlwZSB8fCAwLFxyXG4gICAgICAgICAgICBBcnJhbmdlQ29udGVudDogZGF0YS5BcnJhbmdlQ29udGVudCxcclxuICAgICAgICAgICAgQ3JlYXRlcjogZGF0YS5DcmVhdGVyLFxyXG4gICAgICAgICAgICBNb2RpZmllcjogZGF0YS5DcmVhdGVyLFxyXG4gICAgICAgICAgICBTb3J0Q29kZTogMVxyXG4gICAgICAgIH1dXHJcbiAgICB9XHJcbn1cclxuIl19