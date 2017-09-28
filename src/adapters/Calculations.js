	export function getMortgage(type, dp, price) {
    let r;
    let n;
    switch (type) {
      case "30 Year Fixed Conventional":
        r = 4.25
        n = 360
        break;
      case "15 Year Fixed Conventional":
        r = 3.75
        n = 180
        break;
      case "10 Year Fixed Conventional":
        r = 3.75
        n = 120
        break;
      default:
        r = 4.5
    }
    let loanAmount = (((100 - parseFloat(dp)) / 100) * price)
    let i = ((r / 100) / 12)
    let payment = (i / ((Math.pow((1 + i), n)) - 1)) * ((Math.pow((1 + i), n))) * loanAmount
    return Math.round(payment, 2)
  }

 export function getMI(dp, price) {
    let loanAmount = (((100 - parseFloat(dp)) / 100) * price)
    let MI;
    if (parseInt(dp) <= 5) {
      MI = (loanAmount * .009) / 12
    } else if (parseInt(dp) > 5 && parseInt(dp) <= 10) {
      MI = (loanAmount * .0046) / 12
    } else if (parseInt(dp) > 10 && parseInt(dp) < 20) {
      MI = (loanAmount * .0027) / 12
    } else {
      MI = 0
    }
    return Math.round(MI, 2)
	}
	

export function affordability(props, state, getMortgage, getMI) {
	let mortgage = getMortgage(props.mortgage, props.downPayment, props.purchasePrice)
	let mi = getMI(props.downPayment, props.purchasePrice)
	let HOA = parseInt(state.HOA)
	let HOI = parseInt(state.HOI)
	
	let taxes = props.data[3] === "tax data not available" ? 0 : (JSON.parse(props.data[3].body).property[0].assessment.tax.taxamt / 12)
	let downpayment = (parseInt(props.downPayment) / 100 ) * parseInt(props.purchasePrice)
	let income = (parseInt(state.financialData[0].average_annual_income) / 12)
	let housingPayment = mortgage + mi + HOI + taxes
	let debts = parseInt(state.financialData[0].total_debt)
	let credit = parseInt(state.financialData[0].credit_score)
	let assets = parseInt(state.financialData[0].assets)
	// debugger
	return [{income: income, housingPayment: housingPayment, debts: debts, mortgage: mortgage, mi: mi, hoa: HOA, hoi: HOI, taxes: taxes, downpayment: downpayment, credit: credit, assets: assets}]
}
