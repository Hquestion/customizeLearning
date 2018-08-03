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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0ZXAuanMiXSwibmFtZXMiOlsiU3RlcCIsImRhdGEiLCJBcnJhbmdlTmFtZSIsIkNvdXJzZUZJRCIsIkdyb3VwRklEIiwiRmlsZUNvdW50IiwiQXJyYW5nZVR5cGUiLCJDcmVhdGVyIiwiTW9kaWZpZXIiLCJTb3J0Q29kZSIsIm1vZGVsTGlzdCIsIkZsbmtJRCIsIkFycmFuZ2VGSUQiLCJBcnJhbmdlQ29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBYUEsSSxXQUFBQSxJLEdBQ1QsY0FBYUMsSUFBYixFQUFtQjtBQUFBOztBQUNmLFNBQUtDLFdBQUwsR0FBbUJELEtBQUtDLFdBQXhCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkYsS0FBS0UsU0FBdEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxLQUFLRyxRQUFyQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJKLEtBQUtJLFNBQUwsSUFBa0IsQ0FBbkM7QUFDQSxTQUFLQyxXQUFMLEdBQW1CTCxLQUFLSyxXQUFMLElBQW9CLENBQXZDO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTixLQUFLTSxPQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JQLEtBQUtNLE9BQXJCO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQlIsS0FBS1EsUUFBckI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQUM7QUFDZEMsZ0JBQVEsRUFETTtBQUVkUixtQkFBV0YsS0FBS0UsU0FGRjtBQUdkQyxrQkFBVUgsS0FBS0csUUFIRDtBQUlkUSxvQkFBWSxFQUpFO0FBS2ROLHFCQUFhTCxLQUFLSyxXQUFMLElBQW9CLENBTG5CO0FBTWRPLHdCQUFnQlosS0FBS1ksY0FOUDtBQU9kTixpQkFBU04sS0FBS00sT0FQQTtBQVFkQyxrQkFBVVAsS0FBS00sT0FSRDtBQVNkRSxrQkFBVTtBQVRJLEtBQUQsQ0FBakI7QUFXSCxDIiwiZmlsZSI6IlN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RlcCB7XG4gICAgY29uc3RydWN0b3IgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5BcnJhbmdlTmFtZSA9IGRhdGEuQXJyYW5nZU5hbWVcbiAgICAgICAgdGhpcy5Db3Vyc2VGSUQgPSBkYXRhLkNvdXJzZUZJRFxuICAgICAgICB0aGlzLkdyb3VwRklEID0gZGF0YS5Hcm91cEZJRFxuICAgICAgICB0aGlzLkZpbGVDb3VudCA9IGRhdGEuRmlsZUNvdW50IHx8IDBcbiAgICAgICAgdGhpcy5BcnJhbmdlVHlwZSA9IGRhdGEuQXJyYW5nZVR5cGUgfHwgMFxuICAgICAgICB0aGlzLkNyZWF0ZXIgPSBkYXRhLkNyZWF0ZXJcbiAgICAgICAgdGhpcy5Nb2RpZmllciA9IGRhdGEuQ3JlYXRlclxuICAgICAgICB0aGlzLlNvcnRDb2RlID0gZGF0YS5Tb3J0Q29kZVxuICAgICAgICB0aGlzLm1vZGVsTGlzdCA9IFt7XG4gICAgICAgICAgICBGbG5rSUQ6ICcnLFxuICAgICAgICAgICAgQ291cnNlRklEOiBkYXRhLkNvdXJzZUZJRCxcbiAgICAgICAgICAgIEdyb3VwRklEOiBkYXRhLkdyb3VwRklELFxuICAgICAgICAgICAgQXJyYW5nZUZJRDogJycsXG4gICAgICAgICAgICBBcnJhbmdlVHlwZTogZGF0YS5BcnJhbmdlVHlwZSB8fCAwLFxuICAgICAgICAgICAgQXJyYW5nZUNvbnRlbnQ6IGRhdGEuQXJyYW5nZUNvbnRlbnQsXG4gICAgICAgICAgICBDcmVhdGVyOiBkYXRhLkNyZWF0ZXIsXG4gICAgICAgICAgICBNb2RpZmllcjogZGF0YS5DcmVhdGVyLFxuICAgICAgICAgICAgU29ydENvZGU6IDFcbiAgICAgICAgfV1cbiAgICB9XG59XG4iXX0=