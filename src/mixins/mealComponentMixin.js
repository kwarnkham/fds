export const mealComponentMixin = {
    methods: {
        showDetail(meal) {
            this.$store.dispatch("setMealDetail", meal);
            this.$refs.mealDetail.toggleDialog(true);
        },
        closeMealDetail() {
            this.$refs.mealDetail.toggleDialog(false);
        }
    }
}