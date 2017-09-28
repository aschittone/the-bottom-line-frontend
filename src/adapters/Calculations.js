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
	

export function affordability(props, state) {
		debugger



		return []
	}
