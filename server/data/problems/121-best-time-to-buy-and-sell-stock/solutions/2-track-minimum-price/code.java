class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE; // buy price
        int maxProfit = 0; // sell price
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price; //update buy price if we find a new minimum
            } else if (price - minPrice > maxProfit) { // if selling today is more profitable than our current max profit
                maxProfit = price - minPrice; // update max profit to the profit we would get by selling today
            }
        }
        
        return maxProfit;
    }
}