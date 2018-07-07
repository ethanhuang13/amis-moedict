export default {
    methods: {
        getWordFromHash(hash) {
            if (!hash)
            {
                hash = location.hash
            }
            return hash.replace('#:', '')
        }
    }
}