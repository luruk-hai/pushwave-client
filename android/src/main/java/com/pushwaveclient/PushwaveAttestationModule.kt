package com.pushwaveclient

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.tasks.OnFailureListener
import com.google.android.gms.tasks.OnSuccessListener
import com.google.android.play.core.integrity.IntegrityManager
import com.google.android.play.core.integrity.IntegrityManagerFactory
import com.google.android.play.core.integrity.IntegrityTokenRequest

class PushwaveAttestationModule(private val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

    override fun getName(): String = "PushwaveAttestation"

    @ReactMethod
    fun getIntegrityToken(nonce: String, cloudProjectNumber: Double?, promise: Promise) {
        try {
            if (cloudProjectNumber == null) {
                promise.reject("PLAY_INTEGRITY_ERROR", "cloudProjectNumber is required")
                return
            }

            val manager: IntegrityManager = IntegrityManagerFactory.create(context)
            val request = IntegrityTokenRequest.builder()
                .setNonce(nonce)
                .setCloudProjectNumber(cloudProjectNumber.toLong())
                .build()

            manager.requestIntegrityToken(request)
                .addOnSuccessListener(
                    OnSuccessListener { response -> promise.resolve(response.token()) }
                )
                .addOnFailureListener(
                    OnFailureListener { error ->
                        promise.reject("PLAY_INTEGRITY_ERROR", error.localizedMessage, error)
                    }
                )
        } catch (e: Exception) {
            promise.reject("PLAY_INTEGRITY_ERROR", e.localizedMessage, e)
        }
    }
}
