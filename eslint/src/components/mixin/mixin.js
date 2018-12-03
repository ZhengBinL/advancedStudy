import {keyBoardEnter} from '../../axios/common/common'

const mixin = {
  methods:{
    search(e){
      this.resData.currentPage = 1;
      keyBoardEnter(e, () => {
        this.list();
      })
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.list();
    }
  }
}
export default mixin
