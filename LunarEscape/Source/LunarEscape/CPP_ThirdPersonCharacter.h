// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "CPP_ThirdPersonCharacter.generated.h"

UCLASS()
class LUNARESCAPE_API ACPP_ThirdPersonCharacter : public ACharacter
{
	GENERATED_BODY()

public:
	// Sets default values for this character's properties
	ACPP_ThirdPersonCharacter();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;
	
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

private:
	void MoveForward(float AxisValue);
	void MoveRight(float AxisValue);

	void Turn(float AxisValue);
	void LookUp(float AxisValue);

	void TurnRate(float AxisValue);
	void LookUpRate(float AxisValue);

	UPROPERTY(EditAnywhere)
		float BaseTurnRate = 45.f;
	UPROPERTY(EditAnywhere)
		float BaseLookUpRate = 45.f;

};
