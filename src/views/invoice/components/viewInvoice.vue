<template>
  <div>
    <div class="title-head-warp">
      <div class="title-head-desc-warp">
        <div class="desc-font">{{ row.billType === '2' ? '增值税普通发票' : '增值税专用发票'}}</div>
        <div class="split-line"></div>
        <div class="title-font">发票联</div>
      </div>
      <div class="title-head-date-warp">
        <span class="desc-font">申请日期：</span>
        <span class="title-font">{{detail.createTime}}</span>
      </div>
    </div>
    <div class="body-warp">
      <div class="body-warp-top">
        <div class="table-columns title-font table-row-div-bottom table-column-div-right">
          <div class="table-text-vertical">购买方</div>
        </div>
        <div style="flex: 5;" class="table-column-div-right">
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">名&nbsp; &nbsp; &nbsp; &nbsp;称:</div>
            <div class="table-desc">{{detail.companyName}}</div>
          </div>
          <div class="table-row table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">纳税人识别号:</div>
            <div class="table-desc">{{detail.taxpayerNum}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">地址-电话:</div>
            <div class="table-desc">{{detail.companyAddMobile}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">开户行及账号:</div>
            <div class="table-desc">{{detail.bankNameAccount}}</div>
          </div>
        </div>
        <div class="table-columns title-font table-row-div-bottom table-column-div-right">
          <div class="table-text-vertical">收件人</div>
        </div>
        <div style="flex: 3;">
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">收件人姓名:</div>
            <div class="table-desc">{{detail.billConsignee}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">收件人手机号:</div>
            <div class="table-desc">{{detail.billPhone}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">收件人地址:</div>
            <div class="table-desc">{{detail.billAddress}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right"></div>
            <div class="table-desc"></div>
          </div>
        </div>
      </div>
      <div class="body-warp-middle">
        <div class="table-row table-row-div-bottom">
          <div
            style="flex: 1; justify-content: center;"
            class="table-title table-column-div-right"
          >货物或应税劳务、服务名称</div>
          <div style="flex: 1;" class="table-desc">金额（元）</div>
        </div>
        <div class="table-row table-row-div-bottom" style="height: 100px;">
          <div
            style="flex: 1; justify-content: center; "
            class="table-title table-column-div-right"
          >建筑服务*工程款</div>
          <div style="flex: 1; justify-content: center;" class="table-desc">{{detail.serviceRate}}</div>
        </div>
        <div class="table-row table-row-div-bottom">
          <div
            style="flex: 1; justify-content: center;"
            class="table-title table-column-div-right"
          >价税合计（大写）</div>
          <div style="flex: 1; display: flex;" class="table-title">
            <div
              style="flex: 1; align-self: stretch;"
              class="table-desc table-column-div-right"
            >{{detail.accountNumStr}}</div>
            <div style="flex: 1; display: flex;" class="title-font">
              （小写）
              <span class="table-desc">{{detail.accountNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="body-warp-bottom">
        <div class="table-columns title-font table-row-div-bottom table-column-div-right">
          <div class="table-text-vertical">销售方</div>
        </div>
        <div style="flex: 5;" class="table-column-div-right">
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">名&nbsp; &nbsp; &nbsp; &nbsp;称:</div>
            <div class="table-desc">{{detail.companyName1}}</div>
          </div>
          <div class="table-row table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">纳税人识别号:</div>
            <div class="table-desc">{{detail.taxpayerNum1}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">地址-电话:</div>
            <div class="table-desc">{{detail.companyAddMobile1}}</div>
          </div>
          <div class="table-row table-row-div-bottom">
            <div class="table-title table-column-div-right">开户行及账号:</div>
            <div class="table-desc">{{detail.bankNameAccount1}}</div>
          </div>
        </div>
        <div class="table-columns title-font table-row-div-bottom table-column-div-right">
          <div class="table-text-vertical">备注</div>
        </div>
        <div style="flex: 3;" class="table-row-div-bottom">{{detail.descript}}</div>
      </div>
    </div>
    <div v-if="detail.invoiceStatus == 0" class="body-ope">
      <div style="display: flex;align-items: center;">
        <div class="body-ope-button" @click="finish">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  finishInvoiceApproveApi
} from '@/api/'

export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    async finish() {
      const res = await finishInvoiceApproveApi({mainId: this.detail.mainId})
      if (res && res.code == 0) {
        this.$emit('success')
      }
    }
  }
};
</script>

<style>
.title-head-warp {
  display: flex;
  justify-content: center;
  position: relative;
}

.title-head-desc-warp {
  text-align: center;
}

.title-head-date-warp {
  position: absolute;
  right: 0;
}

.body-warp {
  border: 1px solid #e9a549;
  border-bottom: none;
}

.body-warp-top,
.body-warp-bottom {
  display: flex;
}

.body-ope {
  display: flex;
  justify-content: center;
  position: relative;
  height: 60px;
}

.body-ope-button {
  padding: 5px;
  background: #409eff;
  font-size: 12px;
  margin: 0 2px;
  color: #fff;
  cursor: pointer;
}

.desc-font {
  color: #0c84e5;
  font-size: 12px;
}

.title-font {
  color: #e9a549;
  font-size: 12px;
}

.split-line {
  height: 3px;
  width: 210px;
  margin: 7px 0;
  border: 1px solid #e9a549;
  border-left: none;
  border-right: none;
}

.table-row {
  display: flex;
  height: 25px;
}

.table-columns {
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-title {
  color: #e9a549;
  font-size: 12px;
  width: 100px;
  padding: 0 5px;
  display: flex;
  align-items: center;
}

.table-desc {
  color: #0c84e5;
  font-size: 12px;
  padding: 0 5px;
  display: flex;
  align-items: center;
}

.table-text-vertical {
  width: 12px;
}

.table-row-div-bottom {
  border-bottom: 1px solid #e9a549;
}

.table-column-div-right {
  border-right: 1px solid #e9a549;
}
</style>