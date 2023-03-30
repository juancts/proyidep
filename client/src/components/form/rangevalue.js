


export function rangeValue(rangeId, rangeValueId) {
    const value = document.querySelector(`#${rangeId}`)
    const input = document.querySelector(`#${rangeValueId}`)
    value.textContent = input.value
    input.addEventListener("input", (event) => {
      value.textContent = event.target.value
    })

  
}
