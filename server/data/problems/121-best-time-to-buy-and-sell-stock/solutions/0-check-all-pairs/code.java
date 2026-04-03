class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;

        // outer loop: the day we choose to buy
        for (int i = 0; i < prices.length; i++) {
            // inner loop: the day we choose to sell (must be after buy day)
            for (int j = i + 1; j < prices.length; j++) {
                int currentProfit = prices[j] - prices[i];
                if (currentProfit > maxProfit) {
                    maxProfit = currentProfit;
                }
            }
        }
        
        return maxProfit;
    }
}