<template>
 <v-card class="ma-2 pa-3">
            <table class="order-items-table" cellpadding="0" cellspacing="0">
                <tbody v-for="item in orderGroup" v-bind:key="item._id">
                    <tr class="tr-title">
                        <td>{{item.name}}</td>
                        <td>Quantity</td>
                        <td>Price</td>
                    </tr>
                    <tr class="tr-item" v-for="(groupItem, index) in item.items" v-bind:key="index">
                        <td>
                            <div class="md-text--theme-primary md-font-medium">{{groupItem.name}}</div>
                            <div class="item-details" >
                                <div v-for="(itemDetail, index) in groupItem.items" v-bind:key="index">
                                    <label>{{itemDetail.type}} : </label>
                                    <span v-if="itemDetail.selectedName">{{itemDetail.selectedName}}</span>
                                    <span v-if="itemDetail.selections && itemDetail.selections.length > 0">
                                        {{itemDetail.selections.map(x => x.selectedName).join(",")}}
                                    </span>
                                </div>
                                <div v-if="groupItem.note && groupItem.note.length > 0">
                                    <label>Note : </label>
                                    {{groupItem.note}}
                                </div>
                            </div>
                        </td>
                        <td>{{groupItem.quantity}}</td>
                        <td>$ {{groupItem.totalPrice.toFixed(2)}}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">Subtotal:</td>
                        <td>$ {{order.subTotal.toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Tax:</td>
                        <td>$ {{order.tax.toFixed(2)}}</td>
                    </tr>
                    <tr v-if="order.deliveryCharge > 0">
                        <td colspan="2">Delivery Charge:</td>
                        <td>$ {{order.deliveryCharge.toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Total:</td>
                        <td>$ {{order.orderTotal.toFixed(2)}}</td>
                    </tr>
                </tfoot>
            </table>
    </v-card>
</template>

<script>
import { orderItemsByGroup } from "../utils/order.helper";
export default {
  props: ["order"],
  data() {
    return {
      orderGroup: []
    };
  },
  mounted() {
    this.orderGroup = orderItemsByGroup(this.order);
  },
  watch: {
    order() {
      this.orderGroup = orderItemsByGroup(this.order);
    }
  }
};
</script>

<style>
.order-items-table {
  border: 1px solid #e5e5e5;
  background-color: #fff;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  color: #353434;
}
.order-items-table .tr-title {
  background-color: #f5f5f5;
}
.order-items-table td {
  padding: 7px 15px;
}
.order-items-table .tr-title td {
  font-weight: 500;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}
.order-items-table tbody:first-child .tr-title td {
  border-top-width: 0;
}
.order-items-table tr td:last-child,
.order-items-table tr td:nth-child(2) {
  width: 25%;
  text-align: right;
  vertical-align: top;
}
.order-items-table tfoot {
  background-color: #f5f5f5;
}
.order-items-table tfoot td {
  padding: 2px 15px;
}
.order-items-table tfoot td:first-child {
  font-weight: 500;
}
.order-items-table tfoot tr:first-child td {
  border-top: 1px solid #e5e5e5;
  padding-top: 15px;
}
.order-items-table tfoot tr:last-child td {
  font-size: 17px;
  font-weight: 500;
  padding-bottom: 15px;
}
.order-items-table .item-details {
  font-size: 12px;
  padding: 5px 0;
}
.md-text--theme-primary {
  color: #b71c1c;
}
.order-items-table .item-details label {
  font-weight: 500;
}
</style>
