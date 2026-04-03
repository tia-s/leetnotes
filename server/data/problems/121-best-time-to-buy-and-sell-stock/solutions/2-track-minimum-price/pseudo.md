# left pointer = buy day
# right pointer = sell day

Initialize min_price to a very large number (Infinity)
Initialize max_profit to 0

For each price in the list:
    If current price < min_price:
        Update min_price to current price
    Else if (current price - min_price) > max_profit:
        Update max_profit to (current price - min_price)

Return max_profit