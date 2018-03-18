export class Step {
    constructor (data) {
        this.ArrangeName = data.ArrangeName
        this.CourseFID = data.CourseFID
        this.GroupFID = data.GroupFID
        this.FileCount = data.FileCount || 0
        this.ArrangeType = data.ArrangeType || 0
        this.Creater = data.Creater
        this.Modifier = data.Creater
        this.SortCode = data.SortCode
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
        }]
    }
}
